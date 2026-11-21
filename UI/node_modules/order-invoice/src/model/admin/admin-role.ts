export interface AdminRole {
  name: string;
  /** Admin and User are built in: they cannot be deleted. */
  isBuiltIn: boolean;
  userCount: number;
}
