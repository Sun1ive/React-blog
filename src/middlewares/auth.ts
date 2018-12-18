import { Context } from 'koa';
import { getUserById } from '../controllers/auth';

export const withAuth = async (ctx: Context, next: (err?: Error) => Promise<void>) => {
  try {
    ctx.state.userData = await getUserById(ctx.state.user.data);

    await next();
  } catch (error) {
    await next(error);
  }
};
