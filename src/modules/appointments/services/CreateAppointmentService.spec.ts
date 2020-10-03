import CreatAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError';

describe('CreateAppointment',()=>{

  it('Should be able to create an Appointmnet!', async ()=>{
    const fakeAppointmentRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreatAppointmentService(fakeAppointmentRepository);

   const appointment = await createAppointment.execute({
      date:new Date(),
      provider_id:'123123123',
    })
    
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
    console.log(appointment)


  })

  it('Should NOT be able to create two Appointmnet on the same time!',async ()=>{
    const fakeAppointmentRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreatAppointmentService(fakeAppointmentRepository);

    const appointmentDate = new Date(2020,4,10,11);

  await createAppointment.execute({
      date:appointmentDate,
      provider_id:'123123123',
    })

    expect(  createAppointment.execute({
      date:appointmentDate,
      provider_id:'123123123',
    })).rejects.toBeInstanceOf(AppError)


  })


})
