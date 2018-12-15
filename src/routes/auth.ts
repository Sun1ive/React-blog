import { Context } from 'koa';

import * as Router from 'koa-router';
import { ICredentials } from '../@Types/credentials';
import { createUser, getUser } from '../controllers/auth';
import { comparePasswords } from '../utils/password';

const router = new Router();

router.post('/api/user/signup', async (ctx: Context) => {
  const { email, password }: ICredentials = ctx.request.body;

  const user = await createUser({ email, password });

  ctx.status = 200;
  ctx.body = {
    data: user
  };
});

router.post('/api/user/signin', async (ctx: Context) => {
  const { email, password } = ctx.request.body;

  const user = await getUser({ email });

  if (user) {
    if (comparePasswords(password, user.password)) {
      ctx.status = 200;
      ctx.body = {
        data: user
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        data: 'Password provided does not match'
      };
    }
  } else {
    ctx.status = 404;
    ctx.body = {
      data: {
        message: 'Not found'
      }
    };
  }
});

export default router;
