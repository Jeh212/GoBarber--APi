
import Appoitment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IAppointmentsRepository{
  
  create(data:ICreateAppointmentDTO): Promise<Appoitment>;
  findByDate(date:Date):Promise<Appoitment|undefined>;
  findAllInMonthFromProvider({provider_id,month,year}:IFindAllInMonthProviderDTO):Promise<Appoitment[]>;
  findAllInDayFromProvider({provider_id,month,year,day}:IFindAllInDayProviderDTO):Promise<Appoitment[]>
}