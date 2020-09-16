import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x] Recebimento das infos
 * [/] Tratativa de erros/excessões
 * [x] Acesso ao repositõrio
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
  
    const findAppoitmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentInSameDate){
      throw Error("This hour is already booked.");
    } 
    
    const appointment = appointmentsRepository.create({
      provider, 
      date: appointmentDate
    });

    // Salva no db o appointment
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

/**
 * Services são responsáveis pelas regras de negõcio da aplicação
 * Eles não tem acesso direto aos dados da requisição e aos dados da resposta.
 */

 /**
  * Dependency Inversion
  * Sempr que o service tive ruma dependencia externa ao invés de instaciar a classe
  * de repositõrio dentro do service, recebemos ele como um parametro dentro do constructor.
  * ISso é improtante porque faz com que essa dependencia seja a mesma em todo o projeto e não 
  * instancias separadas dessa dependencia.
  */