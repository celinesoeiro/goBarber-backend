import { EntityRepository, Repository } from 'typeorm';

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository {

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoitment = await this.findOne({
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
