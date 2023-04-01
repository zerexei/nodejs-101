import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { DB } from './database';
import { Post } from './controllers/PostController';
// import assert from 'node:assert/strict';

dotenv.config();

const app: Express = express()
const port = process.env.PORT;

app.use(bodyParser.json())
// assert.equal(true, false);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/users', async (req: Request, res: Response) => {
  const users = await DB.getUsers();
  res.send(users)
})

app.post('/users/1', async (req: Request, res: Response) => {
  const user = await DB.createUser('John', 'john.doe@mail.com');
  res.send(user);
})


// create a post
app.post('/posts', async (req, res) => {
  const validated = {
    title: req.body.title,
    content: req.body.content,
    published: req.body?.published,
    authorId: Number(req.body.authorId)
  }

  const post = await Post.store(validated);
  res.send(post);
})

// show all post
app.get('/posts', async (req, res) => {
  const post = await Post.index();
  res.send(post);
})

// show a post
app.get('/posts/:id', async (req, res) => {
  const post = await Post.show(Number(req.params.id));
  res.send(post);
})

// edit a post
app.patch('/posts/:id', async (req, res) => {
  const validated = {
    title: req.body?.title,
    content: req.body?.content,
    published: req.body?.published,
  }
  
  const post = await Post.update(validated, Number(req.params.id));
  res.send(post);
})

// delete a post
app.delete('/posts/:id', async (req, res) => {
  await Post.destroy(Number(req.params.id));
  res.send("Post successfuly deleted");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
