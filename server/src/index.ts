require('dotenv').config();

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as compress from 'koa-compress';
import * as koaBodyParser from 'koa-bodyparser';
import * as koaStatic from 'koa-static';
import * as logger from 'koa-logger';

import errorMiddleware from './middlewares/errorMiddleware';

import authRoutes from './routes/auth';

import { PORT } from '../config';

const app = new Koa();
app.use(compress());
app.use(koaBodyParser());
app.use(koaStatic('../static'));
app.use(logger());

const router = new Router();

router.get('*', async ctx => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());
app.use(authRoutes.routes());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Server running on port 3000');
});
