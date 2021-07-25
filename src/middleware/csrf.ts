import csurfConfig from 'csurf';

export const csurf = csurfConfig({
  cookie: {
    httpOnly: true,
    maxAge: 3600,
    signed: true,
  },
});
