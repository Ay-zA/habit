import { Router } from 'express';
import todoRoutes from './entities/todo/todo.routes';
import userRoutes from './entities/user/user.routes';

const apiRouter = new Router();
// import { jwtAuth } from '@/services/auth.service';

apiRouter.use('/todos', todoRoutes);
apiRouter.use('/users', userRoutes);

export default apiRouter;
