import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentController from '@modules/appointments/infra/http/controllers/ProvidersAppointmentsController'
const appoitmentRouter = Router();

const appointmentController = new AppointmentController();
const providerAppointmentController =  new ProviderAppointmentController();

appoitmentRouter.use(ensureAuthenticated);

appoitmentRouter.get('/me',providerAppointmentController.index);

appoitmentRouter.post('/',appointmentController.create);

export default appoitmentRouter;
