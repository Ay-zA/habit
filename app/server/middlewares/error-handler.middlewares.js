import { errors as celebrateErrors } from 'celebrate';
import { handleApiErrors, prettyErrors } from '@/services/error-handler';

export const addErrorHandlers = (app) => {
  app.use(celebrateErrors());
  app.use(handleApiErrors);
  app.use(prettyErrors);
};
