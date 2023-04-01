import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { DB } from './database';
// import assert from 'node:assert/strict';

dotenv.config();

const app: Express = express()
const port = process.env.PORT;

// assert.equal(true, false);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/users', async (req: Request, res: Response) => {
  const users = await DB.getUsers();
  res.send(users)
})

app.get('/users/1', async (req: Request, res: Response) => {
  const user = await DB.createUser('Jane', 'jane.doe@mail.com');
  res.send(user);
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
