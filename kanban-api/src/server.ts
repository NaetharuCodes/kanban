import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the Kanban API Server!');
});

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello World from the test route!');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});