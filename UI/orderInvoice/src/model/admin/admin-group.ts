export interface AdminGroup {
  name: string;
  description: string | null;
  memberCount: number;
}

export interface AdminGroupMember {
  userId: string;
  email: string;
  displayName: string;
}

export interface AdminGroupDetail {
  name: string;
  description: string | null;
  members: AdminGroupMember[];
}
