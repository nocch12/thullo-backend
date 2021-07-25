import {User} from '@prisma/client'

export type responseUser = Omit<User, 'password'>;