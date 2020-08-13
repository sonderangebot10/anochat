export interface Room {
    uid: string;
    displayName: string;
    password?: string;
    owner: string;
    ownerId: string;
    guests: string[];
  }
