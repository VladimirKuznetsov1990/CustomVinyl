import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  address: z.string(),
  phone: z.string(),
  roleId: z.number(),
});

export type UserType = {
  id: number;
  username: string;
  email: string;
  address: string;
  phone: string;
  roleId: number;
};

export type UserSignUpType = Omit<UserType, 'id' | 'roleId' > & { pass: string };
export type UserLoginType = Omit<UserSignUpType, 'username'>;

export type UserFromBackendType = { accessToken: string; user: UserType };

export type UserStateType = { status: 'fetching' | 'guest' | 'logged' } & Partial<UserType>;
