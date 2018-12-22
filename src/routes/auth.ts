import { Context } from 'koa';
import Router from 'koa-router';

import { ICredentials } from '../@Types/credentials';
import { createUser, getUserByEmail, updateUser, findByRefreshToken } from '../controllers/auth';
import { comparePasswords } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import { omit } from 'lodash';
import { withAuth } from '../middlewares/auth';

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
    ctx.throw(401, 'Passwords does not match');
  }

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken();

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
    ctx.throw(401, 'Not found');
    return;
  }

  const accessToken = generateAccessToken({ id: user.id });
  const newRefreshToken = generateRefreshToken();
});

export default router;
