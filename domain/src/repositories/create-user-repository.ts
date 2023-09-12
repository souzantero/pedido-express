import { User } from "../entities";

export interface CreateUserRepository {
  create(data: CreateUserData): Promise<User>;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}