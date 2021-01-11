import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
