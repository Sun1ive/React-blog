/* tslint:disable-next-line */
require('dotenv').config();

import Koa, { Context } from 'koa';
import Router from 'koa-router';
import compress from 'koa-compress';
import koaBodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import logger from 'koa-logger';
import koaCors from '@koa/cors';
import koaJwtMiddleware from 'koa-jwt';

import errorMiddleware from './middlewares/errorMiddleware';

import authRoutes from './routes/auth';
import db from './models';

import { PORT, JWT_SECRET } from '../config';

export const createApp = async () => {
  const app = new Koa();
  const router = new Router();

  app
    .use(koaCors())
    .use(compress())
    .use(koaBodyParser())
    .use(koaStatic('../static'))
    .use(logger());

  router.get('/api', async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
      status: 'OK'
    };
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
  router.use('/api/users', authRoutes.routes());

  app.use(
    koaJwtMiddleware({
      secret: JWT_SECRET
    })
  );

  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
  } catch (error) {
    console.log('error during connection to DB', error);
    throw new Error(error);
  }

  app.use(errorMiddleware);

  return app;
};

if (!module.parent) {
  createApp().then(app => {
    app.listen(PORT, () => {
      console.log('Server running on port 3000');
    });
  });
}
