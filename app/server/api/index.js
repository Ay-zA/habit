const { Router } = require('express');
const apiRouter = new Router(); // eslint-disable-line new-cap

import todoRoutes from './routes/todo.routes';

apiRouter.use('/todos', todoRoutes);

export default apiRouter;
