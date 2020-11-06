import { Request, Response } from 'express';
import { container } from 'tsyringe';


import ProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { da } from 'date-fns/locale';

export default class ProviderDayAvailabilityController {
	public async index(request: Request, response: Response): Promise<Response> {
		const {provider_id} =  request.params;
		const { month, year,day } = request.body;

		console.log(provider_id,month,year,day)
		const listProviderDayAvailability = container.resolve(ProviderDayAvailability);

		const appointment = await listProviderDayAvailability.execute({
			month,
      provider_id,
      day,
			year
		});

		return response.json(appointment);
	}
}
