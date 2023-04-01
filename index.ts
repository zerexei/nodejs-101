import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

import assert from 'node:assert/strict';

dotenv.config();

const app: Express = express()
const port = process.env.PORT;

// assert.equal(true, false);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
