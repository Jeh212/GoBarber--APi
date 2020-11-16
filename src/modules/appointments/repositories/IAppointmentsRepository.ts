
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IAppointmentsRepository{
  
  create(data:ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider({provider_id,month,year}:IFindAllInMonthProviderDTO):Promise<Appointment[]>;
  findAllInDayFromProvider({provider_id,month,year,day}:IFindAllInDayProviderDTO):Promise<Appointment[]>
}