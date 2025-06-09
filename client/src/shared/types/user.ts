// types/user.ts

export interface User {
  _id: string;
  lastname?: string;
  email?: string;
  phone?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

