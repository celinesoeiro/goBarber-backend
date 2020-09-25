import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuth from '../middlewares/ensureAuth';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuth);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate, 
    provider_id,
  });
  
  return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

export default appointmentsRouter;

// Obrigações da rota: 
//  - Receber a requisição
//  - Chamar outro arquivo
//  - Devolver uma resposta