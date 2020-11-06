import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
const usersRouter = Router();

const usersController = new UsersController();
const updateUserAvatar = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required()
		}
	}),
	usersController.create
);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), updateUserAvatar.update);

export default usersRouter;
