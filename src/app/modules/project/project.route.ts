import express from "express";
import { ProjectControllers } from "./project.controller";
import auth from "../../middlewares/auth";



const router = express.Router()

// create new project
router.post('/create-project',  ProjectControllers.createProject)
// get all projects
router.get('/', auth(), ProjectControllers.getAllProject)
// get one project by id
router.get('/:id', ProjectControllers.getSingleProject)
// get all projects of a specific
router.get('/user-projects/:id', ProjectControllers.getUserProjects)

export const ProjectRoutes = router 