import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  
  const findAppoitmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppoitmentInSameDate){
    return response.status(400).json({message: "This hour is already booked."});  
  } 

  
  const appointment = appointmentsRepository.create({
    provider, 
    date: parsedDate
  });

  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.list();

  return response.json(appointments);
})

export default appointmentsRouter;