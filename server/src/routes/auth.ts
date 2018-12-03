import { Context } from 'koa';

import * as Router from 'koa-router';
import * as I from '../@Types/credentials';

const router = new Router();

router.post('/api/login', async (ctx: Context) => {
  const { email, password }: I.ICredentials = ctx.request.body;

  ctx.status = 200;
  ctx.body = {
    email,
    password
  };
});

export default router;
