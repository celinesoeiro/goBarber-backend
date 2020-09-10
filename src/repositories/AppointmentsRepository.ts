import { isEqual } from "date-fns";

import Appointment from "../models/Appointments";

interface appointmentsDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor(){
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppoitment = this.appointments.find(appointment => 
      isEqual(date, appointment.date)
    );

    return findAppoitment || null;
  }

  public create({ provider, date }: appointmentsDTO ): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public list(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;