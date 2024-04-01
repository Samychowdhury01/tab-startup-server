import express, { Application, Request, Response } from  'express';
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app : Application= express()
// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/', router);

app.get('/', (req : Request, res : Response) => {
  res.send('Hello Tab startup!')
})

// global error handler
app.use(globalErrorHandler);

// not found Route
app.use(notFound)

export default app