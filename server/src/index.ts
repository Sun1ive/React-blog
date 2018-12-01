require('dotenv').config();

import * as Koa from 'koa';
import * as Router from 'koa-router';
import { PORT } from '../config';

const app = new Koa();
const router = new Router();

router.get('*', async ctx => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(PORT);

console.log('Server running on port 3000');
