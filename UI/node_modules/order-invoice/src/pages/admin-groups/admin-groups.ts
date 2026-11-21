import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { AdminGroup, AdminGroupMember } from '../../model/admin/admin-group';
import { AdminGroupsService } from '../../services/admin-groups-service';
import { NotificationService } from '../../utils/notification-service';

/**
 * Create, describe and delete groups. Who is in a group is set on the user (Users page). A group's name never
 * changes, because policies and the hub use it; its description can. Administrators only.
 */
@Component({
  imports: [FormsModule, ButtonDirective, ConfirmDialogModule, DialogModule, InputTextModule, TableModule, ToolbarModule],
  providers: [ConfirmationService],
  selector: 'app-admin-groups',
  styleUrl: './admin-groups.css',
  templateUrl: './admin-groups.html',
})
export class AdminGroups implements OnInit {
  private groups = inject(AdminGroupsService);
  private confirmation = inject(ConfirmationService);
  private notifications = inject(NotificationService);

  protected readonly rows = signal<AdminGroup[]>([]);
  protected readonly loading = signal(false);

  protected readonly dialogVisible = signal(false);
  protected readonly editing = signal<AdminGroup | null>(null);   // null while creating
  protected readonly name = signal('');
  protected readonly description = signal('');
  protected readonly members = signal<AdminGroupMember[]>([]);
  protected readonly saving = signal(false);

  protected readonly isNew = computed(() => this.editing() === null);
  protected readonly canSave = computed(() => !this.saving() && (!this.isNew() || this.cleanName().length > 0));

  ngOnInit(): void {
    this.reload();
  }

  private reload(): void {
    this.loading.set(true);
    this.groups.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((groups) => this.rows.set(groups));
  }

  /** The server stores group names in lower case, so show that. */
  private cleanName(): string {
    return this.name().trim().toLowerCase();
  }

  private cleanDescription(): string | null {
    const text = this.description().trim();
    return text.length > 0 ? text : null;
  }

  protected openNew(): void {
    this.editing.set(null);
    this.name.set('');
    this.description.set('');
    this.members.set([]);
    this.dialogVisible.set(true);
  }

  protected openEdit(group: AdminGroup): void {
    this.editing.set(group);
    this.name.set(group.name);
    this.description.set(group.description ?? '');
    this.members.set([]);
    this.dialogVisible.set(true);
    this.groups.get(group.name).subscribe((detail) => {
      if (detail && this.editing()?.name === group.name) {
        this.members.set(detail.members);
      }
    });
  }

  protected save(): void {
    if (!this.canSave()) {
      return;
    }

    const current = this.editing();
    this.saving.set(true);
    const call = current === null
      ? this.groups.create(this.cleanName(), this.cleanDescription())
      : this.groups.update(current.name, this.cleanDescription());

    call.pipe(finalize(() => this.saving.set(false))).subscribe((saved) => {
      if (saved) {
        this.notifications.success(current === null ? 'Group created' : 'Group saved', saved.name);
        this.dialogVisible.set(false);
        this.reload();
      }
    });
  }

  protected remove(group: AdminGroup): void {
    const who = group.memberCount === 0
      ? 'Nobody is in it.'
      : `${group.memberCount} user(s) will lose it and be signed out when their current session runs out.`;
    this.confirmation.confirm({
      header: 'Delete group',
      message: `Delete the group ${group.name}? ${who}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.groups.delete(group.name).subscribe((deleted) => {
          if (deleted) {
            this.notifications.success('Group deleted', group.name);
            this.reload();
          }
        }),
    });
  }
}
