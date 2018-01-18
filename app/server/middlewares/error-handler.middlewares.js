import { prettyErrors } from '@/utils/pretty-error';

export const addErrorHandlers = (app) => {
  app.use(prettyErrors);
};
