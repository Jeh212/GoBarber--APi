import { injectable, inject } from 'tsyringe';

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day:number
	month: number;
	year: number;
}



@injectable()
export default class ListProviderMonthAvailabilityService {
	constructor(@inject('AppointmentsRepository') private appoitmentsRepository: IAppointmentsRepository) {}

	public async execute({ provider_id, month, year,day }: IRequest): Promise<Appointment[]> {
    
    const appointments = await this.appoitmentsRepository.findAllInDayFromProvider({
      provider_id, 
      month, 
      year,
      day,
    })
    return appointments;
  }
  }

