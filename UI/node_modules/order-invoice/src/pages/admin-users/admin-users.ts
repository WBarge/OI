import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

import { AdminUser } from '../../model/admin/admin-user';
import { AdminGroupsService } from '../../services/admin-groups-service';
import { AdminRolesService } from '../../services/admin-roles-service';
import { AdminUsersService } from '../../services/admin-users-service';
import { AuthService } from '../../services/auth-service';
import { NotificationService } from '../../utils/notification-service';

/** Mirrors the server's password rule (AuthPolicy.MinPasswordLength). The server is what enforces it. */
export const MIN_PASSWORD_LENGTH = 12;

type UserStatus = 'Active' | 'Locked' | 'Disabled';

/**
 * Create, edit, disable and delete users, and give them roles and groups. Administrators only: the route
 * is guarded, and every call is refused by the server for anyone else.
 */
@Component({
  imports: [FormsModule, ButtonDirective, ConfirmDialogModule, DialogModule, InputTextModule, MultiSelectModule, TableModule, TagModule, ToolbarModule],
  providers: [ConfirmationService],
  selector: 'app-admin-users',
  styleUrl: './admin-users.css',
  templateUrl: './admin-users.html',
})
export class AdminUsers implements OnInit {
  private users = inject(AdminUsersService);
  private roles = inject(AdminRolesService);
  private groups = inject(AdminGroupsService);
  private confirmation = inject(ConfirmationService);
  private notifications = inject(NotificationService);
  protected readonly auth = inject(AuthService);

  protected readonly minPasswordLength = MIN_PASSWORD_LENGTH;

  // the list
  protected readonly rows = signal<AdminUser[]>([]);
  protected readonly totalRecords = signal(0);
  protected readonly loading = signal(false);
  protected readonly first = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly search = signal('');

  // what can be chosen
  protected readonly roleOptions = signal<string[]>([]);
  protected readonly groupOptions = signal<string[]>([]);

  // the create / edit dialog
  protected readonly dialogVisible = signal(false);
  protected readonly editing = signal<AdminUser | null>(null);   // null while creating
  protected readonly email = signal('');
  protected readonly displayName = signal('');
  protected readonly password = signal('');
  protected readonly selectedRoles = signal<string[]>([]);
  protected readonly selectedGroups = signal<string[]>([]);
  protected readonly saving = signal(false);

  // the reset password dialog
  protected readonly passwordTarget = signal<AdminUser | null>(null);
  protected readonly newPassword = signal('');
  protected readonly resetting = signal(false);

  protected readonly isNew = computed(() => this.editing() === null);

  protected readonly canSave = computed(() => {
    if (this.saving() || this.displayName().trim().length === 0) {
      return false;
    }
    return !this.isNew() || (this.email().includes('@') && this.password().length >= MIN_PASSWORD_LENGTH);
  });

  protected readonly canReset = computed(() => !this.resetting() && this.newPassword().length >= MIN_PASSWORD_LENGTH);

  ngOnInit(): void {
    // the list itself is loaded by the table, which asks for its first page when it appears
    this.roles.list().subscribe((roles) => this.roleOptions.set(roles.map((r) => r.name)));
    this.groups.list().subscribe((groups) => this.groupOptions.set(groups.map((g) => g.name)));
  }

  // ------------------------------------------------------------------ the list

  protected load(event: TableLazyLoadEvent): void {
    this.first.set(event.first ?? 0);
    this.pageSize.set(event.rows ?? this.pageSize());
    this.reload();
  }

  protected applySearch(): void {
    this.first.set(0);
    this.reload();
  }

  private reload(): void {
    const page = Math.floor(this.first() / this.pageSize()) + 1;
    this.loading.set(true);
    this.users.list(this.search(), page, this.pageSize())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((result) => {
        this.rows.set(result.data);
        this.totalRecords.set(result.totalRecordSize);
      });
  }

  /** After a change: reload, and step back a page if the change emptied the last one. */
  private refreshAfterChange(removedOne = false): void {
    if (removedOne && this.rows().length === 1 && this.first() > 0) {
      this.first.set(Math.max(0, this.first() - this.pageSize()));
    }
    this.reload();
  }

  protected statusOf(user: AdminUser): UserStatus {
    if (user.isDisabled) {
      return 'Disabled';
    }
    return user.lockoutEnd !== null && new Date(user.lockoutEnd) > new Date() ? 'Locked' : 'Active';
  }

  protected severityOf(user: AdminUser): 'success' | 'warn' | 'danger' {
    const status = this.statusOf(user);
    return status === 'Disabled' ? 'danger' : status === 'Locked' ? 'warn' : 'success';
  }

  /** You cannot disable, delete or take Admin away from yourself; the server refuses too. */
  protected isSelf(user: AdminUser): boolean {
    return user.id === this.auth.userId();
  }

  // ------------------------------------------------------------------ create and edit

  protected openNew(): void {
    this.editing.set(null);
    this.email.set('');
    this.displayName.set('');
    this.password.set('');
    this.selectedRoles.set(this.roleOptions().includes('User') ? ['User'] : []);
    this.selectedGroups.set([]);
    this.dialogVisible.set(true);
  }

  protected openEdit(user: AdminUser): void {
    this.editing.set(user);
    this.email.set(user.email);
    this.displayName.set(user.displayName);
    this.password.set('');
    this.selectedRoles.set([...user.roles]);
    this.selectedGroups.set([...user.groups]);
    this.dialogVisible.set(true);
  }

  protected save(): void {
    if (!this.canSave()) {
      return;
    }

    const roles = this.selectedRoles();
    const groups = this.selectedGroups();
    const current = this.editing();
    const displayName = this.displayName().trim();

    this.saving.set(true);
    const call = current === null
      ? this.users.create({ email: this.email().trim(), displayName, password: this.password(), roles, groups })
      : this.users.update(current.id, { displayName, roles, groups });

    call.pipe(finalize(() => this.saving.set(false))).subscribe((saved) => {
      if (saved) {
        this.notifications.success(current === null ? 'User created' : 'User saved', saved.email);
        this.password.set('');
        this.dialogVisible.set(false);
        this.refreshAfterChange();
      }
    });
  }

  // ------------------------------------------------------------------ password

  protected openResetPassword(user: AdminUser): void {
    this.newPassword.set('');
    this.passwordTarget.set(user);
  }

  protected closeResetPassword(): void {
    this.newPassword.set('');
    this.passwordTarget.set(null);
  }

  protected saveNewPassword(): void {
    const target = this.passwordTarget();
    if (target === null || !this.canReset()) {
      return;
    }

    this.resetting.set(true);
    this.users.resetPassword(target.id, this.newPassword())
      .pipe(finalize(() => this.resetting.set(false)))
      .subscribe((ok) => {
        if (ok) {
          this.notifications.success('Password reset', `${target.email} must sign in again with the new password.`);
          this.closeResetPassword();
        }
      });
  }

  // ------------------------------------------------------------------ disable, enable, delete

  protected toggleDisabled(user: AdminUser): void {
    if (user.isDisabled) {
      this.users.enable(user.id).subscribe((enabled) => {
        if (enabled) {
          this.notifications.success('User enabled', user.email);
          this.refreshAfterChange();
        }
      });
      return;
    }

    this.confirmation.confirm({
      header: 'Disable user',
      message: `Disable ${user.email}? They will be signed out and cannot sign in until you enable them again.`,
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.users.disable(user.id).subscribe((disabled) => {
          if (disabled) {
            this.notifications.success('User disabled', user.email);
            this.refreshAfterChange();
          }
        }),
    });
  }

  protected remove(user: AdminUser): void {
    this.confirmation.confirm({
      header: 'Delete user',
      message: `Delete ${user.email}? This cannot be undone.`,
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.users.delete(user.id).subscribe((deleted) => {
          if (deleted) {
            this.notifications.success('User deleted', user.email);
            this.refreshAfterChange(true);
          }
        }),
    });
  }
}
