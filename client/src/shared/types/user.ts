// types/user.ts

export interface User {
  _id: string;
  fullname?: string;
  email?: string;
  phone?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

