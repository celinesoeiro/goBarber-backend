import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepo = new FakeAppointmentsRepository();
    const createRepository = new CreateAppointmentService(
      fakeAppointmentRepo,
    );

    const appointment = await createRepository.execute({
      date: new Date(),
      provider_id: '0123456789'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('0123456789');
  });

  // it('should not be able to create two appointments at the same time', () => {
  //   expect();
  // });
});
