import express, { Application, Request, Response } from  'express';
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app : Application= express()
// parsers
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
));
// Middleware to enable CORS
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Allow the use of GET, POST, and OPTIONS methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // Allow the Content-Type header in requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Continue to the next middleware
  next();
});
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