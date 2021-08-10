import { User } from '@prisma/client';

export type ResUser = Omit<User, 'password'>;
