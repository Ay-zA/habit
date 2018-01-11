import { Router } from 'express';
import { userRoutes } from './entities/user';
import { projectRoutes } from './entities/project';
import { authRoutes } from './entities/auth';

const apiRouter = new Router();
// import { jwtAuth } from '@/services/auth.service';

apiRouter.get('/', (req, res) => res.json({ health: true }));
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/projects', projectRoutes);

export default apiRouter;
