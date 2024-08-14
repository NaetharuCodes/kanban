import express, { Express, Request, Response } from 'express';
import boardRoutes from './routes/boardRoutes'
var cors = require('cors')

const app: Express = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.use('/api/boards', boardRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});