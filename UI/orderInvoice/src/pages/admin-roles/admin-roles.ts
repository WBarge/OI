import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { AdminRole } from '../../model/admin/admin-role';
import { AdminRolesService } from '../../services/admin-roles-service';
import { NotificationService } from '../../utils/notification-service';

/** List, add and delete roles. Roles are given to users on the Users page. Administrators only. */
@Component({
  imports: [FormsModule, ButtonDirective, ConfirmDialogModule, InputTextModule, TableModule, TagModule],
  providers: [ConfirmationService],
  selector: 'app-admin-roles',
  styleUrl: './admin-roles.css',
  templateUrl: './admin-roles.html',
})
export class AdminRoles implements OnInit {
  private roles = inject(AdminRolesService);
  private confirmation = inject(ConfirmationService);
  private notifications = inject(NotificationService);

  protected readonly rows = signal<AdminRole[]>([]);
  protected readonly loading = signal(false);
  protected readonly newRole = signal('');
  protected readonly adding = signal(false);

  ngOnInit(): void {
    this.reload();
  }

  private reload(): void {
    this.loading.set(true);
    this.roles.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((roles) => this.rows.set(roles));
  }

  protected canAdd(): boolean {
    return !this.adding() && this.newRole().trim().length > 0;
  }

  protected add(): void {
    if (!this.canAdd()) {
      return;
    }
    const name = this.newRole().trim();
    this.adding.set(true);
    this.roles.create(name)
      .pipe(finalize(() => this.adding.set(false)))
      .subscribe((created) => {
        if (created) {
          this.notifications.success('Role added', created.name);
          this.newRole.set('');
          this.reload();
        }
      });
  }

  /** A built-in role cannot be deleted, and neither can one that users still have. The server refuses both too. */
  protected canDelete(role: AdminRole): boolean {
    return !role.isBuiltIn && role.userCount === 0;
  }

  protected whyNotDeletable(role: AdminRole): string {
    if (role.isBuiltIn) {
      return 'Built in: it cannot be deleted';
    }
    return role.userCount > 0 ? 'Still given to users: take it away from them first' : '';
  }

  protected remove(role: AdminRole): void {
    if (!this.canDelete(role)) {
      return;
    }
    this.confirmation.confirm({
      header: 'Delete role',
      message: `Delete the role ${role.name}? This cannot be undone.`,
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.roles.delete(role.name).subscribe((deleted) => {
          if (deleted) {
            this.notifications.success('Role deleted', role.name);
            this.reload();
          }
        }),
    });
  }
}
