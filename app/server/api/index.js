const { Router } = require('express');
const apiRouter = new Router();
import { jwtAuth } from '@/services/auth.service';

import todoRoutes from './entities/todo/todo.routes';
import userRoutes from './entities/user/user.routes';

apiRouter.use('/todos', jwtAuth, todoRoutes);
apiRouter.use('/users', userRoutes);

export default apiRouter;
