import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuth);

providersRouter.get('/', providersController.index);

export default providersRouter;
