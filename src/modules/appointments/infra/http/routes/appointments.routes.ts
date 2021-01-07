import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

const appointmentsRepository = new AppointmentsRepository();


const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuth);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// })

export default appointmentsRouter;

// Obrigações da rota:
//  - Receber a requisição
//  - Chamar outro arquivo
//  - Devolver uma resposta
