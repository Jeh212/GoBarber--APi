import { Router } from 'express';
import ListProviderController from '../controllers/ListProviderController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providerRouters = Router();

const listProviderController = new ListProviderController();

providerRouters.use(ensureAuthenticated);

providerRouters.get('/',listProviderController.index);

export default providerRouters;
