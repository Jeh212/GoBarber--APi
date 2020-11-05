import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentController {
	public async index(request: Request, response: Response): Promise<Response> {
		const { provider_id } = request.params;
		const { day, month, year } = request.body;

		const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService);

		const appointment = await listProviderAppointmentsService.execute({
			provider_id,
			day,
			month,
			year
		});

		return response.json(appointment);
	}
}
