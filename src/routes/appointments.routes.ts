import { Router } from 'express';
import { parseISO, startOfHour, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  
  const findAppoitmentInSameDate = appointments.find(appointment => 
    isEqual(appointment.date, parsedDate)
  );

  if (findAppoitmentInSameDate){
    return response.status(400).json({message: "This hour is already booked."});  
  } 

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);
  
  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  return response.json({ message: "get"})
})

export default appointmentsRouter;