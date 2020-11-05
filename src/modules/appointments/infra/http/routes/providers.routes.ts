import { Router } from 'express';
import ListProviderController from '../controllers/ListProviderController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'



const providerRouters = Router();

const listProviderController = new ListProviderController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
providerRouters.use(ensureAuthenticated);

providerRouters.get('/',listProviderController.index);
providerRouters.get('/:provider_id/month-availability',providerMonthAvailabilityController.create);
providerRouters.get('/:provider_id/day-availability',providerDayAvailabilityController.create);


export default providerRouters;
