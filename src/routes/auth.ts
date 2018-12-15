import { Context } from 'koa';
import * as Router from 'koa-router';

import { ICredentials } from '../@Types/credentials';
import { createUser, getUserByEmail } from '../controllers/auth';
import { comparePasswords } from '../utils/password';

const router = new Router();

router.post('/signup', async (ctx: Context) => {
  const { email, password }: ICredentials = ctx.request.body;

  const user = await createUser({ email, password });

  ctx.status = 200;
  ctx.body = {
    data: user
  };
});

// router.post('/api/signin', async (ctx: Context) => {
//   const { email, password } = ctx.request.body;

//   const user = await getUserByEmail(email);

//   if (!user) {
//     ctx.throw(404);
//   }

//   // if (comparePasswords(password, user.password)) {
//   //   ctx.status = 200;
//   //   ctx.body = {
//   //     data: {
//   //       ...user,
//   //       token
//   //     }
//   //   };
//   // }
// });

export default router;
