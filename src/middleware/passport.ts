import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

import { hasher } from '../libs/hasher';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

// セッションを利用する場合に必要
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// 通常認証
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email', // usernameではなくemailで認証
      passwordField: 'password',
      session: false,
    },
    // リクエストの処理
    async (email, password, done) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && user.password && hasher.check(password, user.password)) {
        const { password: pass, ...resUser } = user;
        done(null, resUser);
      } else {
        done(null, false);
      }
    }
  )
);

// JWT認証
passport.use(
  'verify',
  new JwtStrategy(
    {
      secretOrKey: process.env.APP_SECRET as string,
      jwtFromRequest: (req) => {
        return req?.signedCookies?.jwt || null;
      },
    },
    async (payload, done) => {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (user) {
        const { password: pass, ...resUser } = user;
        done(null, resUser);
      } else {
        done(null, false);
      }
    }
  )
);

export default passport;
