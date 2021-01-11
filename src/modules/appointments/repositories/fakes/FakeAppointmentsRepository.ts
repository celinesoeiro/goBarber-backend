import { uuid } from 'uuidv4';

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  /** CREATE */
  public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  /** FIND BY DATE */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date = date
    );

    return findAppointment;
  }

}

export default AppointmentsRepository;
