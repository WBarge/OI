/** A user as the Admin screens see them (what OI.Auth's api/admin/users answers with). */
export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  /** When a lockout ends. A lockout that ends in year 9999 is how a user is disabled. */
  lockoutEnd: string | null;
  isDisabled: boolean;
  roles: string[];
  groups: string[];
}

export interface NewAdminUser {
  email: string;
  displayName: string;
  password: string;
  roles: string[];
  groups: string[];
}

/** The email is the user's identity and cannot be changed. */
export interface UpdateAdminUser {
  displayName: string;
  roles: string[];
  groups: string[];
}
