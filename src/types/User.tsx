export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  username?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  column: keyof User | null;
  direction: SortDirection;
}

export interface FilterState {
  name: string;
  email: string;
  role: string;
}

export const UserRoles = ["Admin", "User", "Editor", "Viewer"] as const;
export type UserRole = (typeof UserRoles)[number];