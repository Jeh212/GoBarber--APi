import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ProviderMonthAvailability from '@modules/appointments/services/LIstProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
	public async index(request: Request, response: Response): Promise<Response> {
		const {provider_id} = request.params;
		const {  month, year } = request.query;

		const listProviderMonthAvailability = container.resolve(ProviderMonthAvailability);

		const appointment = await listProviderMonthAvailability.execute({
			month:Number(month),
			provider_id,
			year:Number(year)
		});

		return response.json(appointment);
	}
}
