import { getRepository, Repository } from 'typeorm';

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  /** CREATE */
  public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({ provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }

  /** FIND BY DATE */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoitment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppoitment;
  }

}

export default AppointmentsRepository;

/**
 * Quando se usa async/await tranforma a classe em uma promise.
 * Logo, a resposta pode ser obtida assim:
 * findByDate(date).then( res => {} ).catch( err => {} )
 * onde res é do tipo Appointment ou null (nesse caso)
 * OU
 * const res = await findByDate(date)
 */
