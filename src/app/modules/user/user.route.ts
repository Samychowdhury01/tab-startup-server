import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router()


router.post('/create-user',  UserControllers.createUser)
router.get('/:id', auth(), UserControllers.getSingleUser)

export const UserRoutes = router 