import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepo: FakeAppointmentsRepository;
let createRepository: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(()=>{
    fakeAppointmentRepo = new FakeAppointmentsRepository();
    createRepository = new CreateAppointmentService(
      fakeAppointmentRepo,
    );
  });

  it('should be able to create a new appointment', async () => {

    const appointment = await createRepository.execute({
      date: new Date(),
      provider_id: '0123456789'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('0123456789');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date();

    await createRepository.execute({
      date: appointmentDate,
      provider_id: '0123456789'
    });

    await expect(
      createRepository.execute({
        date: appointmentDate,
        provider_id: '0123456789'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
