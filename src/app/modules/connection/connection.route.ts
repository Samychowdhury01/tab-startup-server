import express from "express";
import { ConnectionControllers } from "./connection.controller";
import auth from "../../middlewares/auth";


const router = express.Router()

// create new project
router.post('/send-request', auth(),  ConnectionControllers.sendRequest)

// get all the sended request
router.get('/requests', auth(),  ConnectionControllers.getRequests)


export const ConnectionRoutes = router 