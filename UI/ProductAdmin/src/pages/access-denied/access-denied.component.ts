import { Component } from '@angular/core';

/** Shown to someone who is signed in but is not an administrator. The menu bar above it still offers Sign out. */
@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css'
})
export class AccessDeniedComponent {}
