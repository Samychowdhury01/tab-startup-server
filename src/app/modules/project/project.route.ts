import express from "express";
import { ProjectControllers } from "./project.controller";



const router = express.Router()


router.post('/create-project',  ProjectControllers.createProject)
router.get('/',  ProjectControllers.getAllProject)
router.get('/:id',  ProjectControllers.getSingleProject)
router.get('/user-projects/:id',  ProjectControllers.getUserProjects)

export const ProjectRoutes = router 