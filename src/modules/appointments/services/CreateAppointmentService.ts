import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
/**
 * [x] Recebimento das infos
 * [/] Tratativa de erros/excessões
 * [x] Acesso ao repositõrio
 */

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(
    private appointmentsRepository: IAppointmentsRepository
  ){}

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppoitmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentInSameDate){
      throw new AppError("This hour is already booked.", 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

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
