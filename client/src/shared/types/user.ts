// types/user.ts

export interface User {
  _id: string;
  lastName?: string;
  fistName?: string;
  email?: string;
  phone?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

