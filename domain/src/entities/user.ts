export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  name: string;
  email: string;
  password: string;

  verified: boolean;
}