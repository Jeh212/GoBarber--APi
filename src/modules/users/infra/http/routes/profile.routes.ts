import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().required(),
			old_password: Joi.string(),
			password: Joi.string(),
			password_confirmation: Joi.string().required().valid(Joi.ref('password'))
		}
	}),
	profileController.update
);
profileRouter.get('/', profileController.show);

export default profileRouter;
