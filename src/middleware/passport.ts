import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient } from '@prisma/client';

import { UserLoginRequest } from '../requests/user/UserLoginRequest';
import { hasher } from '../libs/hasher';

const prisma = new PrismaClient();

// セッションを利用する場合に必要
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

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
        const { id, name, email } = user;
        done(null, { id, name, email });
      } else {
        done(null, false);
      }
    }
  )
);

export default passport;
