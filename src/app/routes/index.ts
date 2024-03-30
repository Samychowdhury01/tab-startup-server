import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ProjectRoutes } from '../modules/project/project.route';

const router = Router();

const moduleRoutes = [
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/projects',
      route: ProjectRoutes,
    },
  ];
  
  moduleRoutes.forEach((route) => router.use(route.path, route.route));
  
  export default router;