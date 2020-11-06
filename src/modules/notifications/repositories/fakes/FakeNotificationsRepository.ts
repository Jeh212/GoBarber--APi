import { getMongoRepository, MongoRepository, Raw } from 'typeorm';
import {ObjectID} from 'mongodb'
import Notification from '../../infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { uuid } from 'uuidv4';

class NotificationsRepository implements INotificationsRepository {
	private notifications: Notification[] = []



	public async create({ content, recepient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    
    Object.assign(notification,{id:new ObjectID(),content,recepient_id})

    await this.notifications.push(notification)
		return notification;
	}
}

export default NotificationsRepository;
