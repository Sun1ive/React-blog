import { Context } from 'koa';

import * as Router from 'koa-router';
import * as I from '../@Types/credentials';
import * as C from '../controllers/auth';

const router = new Router();

router.post('/api/user', async (ctx: Context) => {
  const { email, password }: I.ICredentials = ctx.request.body;

  const user = await C.createUser({ email, password });

  ctx.status = 200;
  ctx.body = {
    data: user
  };
});

export default router;
