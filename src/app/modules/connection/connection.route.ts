import express from "express";
import { ConnectionControllers } from "./connection.controller";
import auth from "../../middlewares/auth";


const router = express.Router()

// create new project
router.post('/send-request', auth(),  ConnectionControllers.sendRequest)

export const ConnectionRoutes = router 