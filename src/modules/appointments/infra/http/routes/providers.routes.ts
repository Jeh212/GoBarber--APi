import { Router } from 'express';

import { Joi, Segments, celebrate } from 'celebrate';
import ListProviderController from '../controllers/ListProviderController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providerRouters = Router();

const listProviderController = new ListProviderController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
providerRouters.use(ensureAuthenticated);

providerRouters.get('/', listProviderController.index);
providerRouters.get(
	'/:provider_id/month-availability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required()
		}
	}),
	providerDayAvailabilityController.index
);
providerRouters.get(
	'/:provider_id/day-availability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required()
		}
	}),
	providerMonthAvailabilityController.index
);
export default providerRouters;
