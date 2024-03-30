import express, { Application, Request, Response } from  'express';
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app : Application= express()
// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req : Request, res : Response) => {
  res.send('Hello Tab startup!')
})

// global error handler
app.use(globalErrorHandler);

// not found Route
app.use(notFound)

export default app