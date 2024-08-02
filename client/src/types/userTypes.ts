import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.string(),
  address: z.string(),
  phone: z.string(),
  roleId: z.number(),
});

export type UserType = {
  id: number;
  userName: string;
  email: string;
  address: string;
  phone: string;
  roleId: number;
};

export type UserSignUpType = Omit<UserType, 'id' | 'roleId' > & { pass: string }; //TODO здесь должно быть password
export type UserLoginType = Omit<UserSignUpType, 'userName'>;

export type UserFromBackendType = { accessToken: string; user: UserType };

export type UserStateType = { status: 'fetching' | 'guest' | 'logged' } & Partial<UserType>;
