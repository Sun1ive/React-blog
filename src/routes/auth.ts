import { Context } from 'koa';
import Router from 'koa-router';

import { ICredentials } from '../@Types/credentials';
import { createUser, getUserByEmail, updateUser, findByRefreshToken } from '../controllers/auth';
import { comparePasswords } from '../utils/password';
import { omit } from 'lodash';
import { withAuth } from '../middlewares/auth';
import { generateTokensPair } from '../utils/tokensPair';

const router = new Router();

router.post('/signup', async (ctx: Context) => {
  const { email, password }: ICredentials = ctx.request.body;

  const user = await createUser({ email, password });

  ctx.status = 200;
  ctx.body = {
    data: user
  };
});

router.post('/signin', async (ctx: Context) => {
  const { email, password } = ctx.request.body;

  const user = await getUserByEmail(email);

  if (!user) {
    ctx.throw(404, 'User with this email was not found');
    return;
  }

  if (!comparePasswords(password, user.password)) {
    ctx.throw(403, 'Passwords does not match');
  }

  const { accessToken, refreshToken } = generateTokensPair({ id: user.id });

  await updateUser({
    id: user.id,
    accessToken,
    refreshToken
  });

  const updatedUser = await getUserByEmail(email);

  const data = omit(updatedUser, 'password');

  ctx.status = 200;
  ctx.body = {
    data
  };
});

router.post('/refresh', withAuth, async ctx => {
  const { refreshToken } = ctx.request.body;

  const user = await findByRefreshToken({ refreshToken });

  if (!user) {
    ctx.throw(404, 'Not found');
    return;
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokensPair({ id: user.id });

  await updateUser({
    id: user.id,
    accessToken,
    refreshToken: newRefreshToken
  });

  const updatedUser = await getUserByEmail(user.email);
  const data = omit(updatedUser, 'password');

  ctx.status = 200;
  ctx.body = {
    data
  };
});

export default router;
