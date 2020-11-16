import { getMongoRepository, MongoRepository, Raw } from 'typeorm';

import Notification from '../schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
	private ormRepository: MongoRepository<Notification>;

	constructor() {
		this.ormRepository = getMongoRepository(Notification, 'mongo');
	}

	public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
		const notifications = this.ormRepository.create({
			content,
			recipient_id
		});

		return notifications;
	}
}

export default NotificationsRepository;
