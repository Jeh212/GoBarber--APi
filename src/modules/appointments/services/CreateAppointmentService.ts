import 'reflect-metadata';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { injectable, inject } from 'tsyringe';

import { startOfHour, isBefore, getHours } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
	date: Date;
	user_id: string;
	provider_id: string;
}

@injectable()
class CreateAppointmentService {
	constructor(@inject('AppointmentRepository') private appointmetsRepository: IAppointmentsRepository) {}

	public async execute({ date, user_id, provider_id }: RequestDTO): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError("You can't create an appointent on past date!");
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError('You can only create an appointent between 8pm and 5pm !');
		}

		if (user_id === provider_id) {
			throw new AppError("You can't create an appointent with yourself!");
		}

		const findAppointmentInSameDate = await this.appointmetsRepository.findByDate(appointmentDate);

		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked', 401);
		}

		const appointment = await this.appointmetsRepository.create({
			provider_id,
			user_id,
			date: appointmentDate
		});
		return appointment;
	}
}

export default CreateAppointmentService;
