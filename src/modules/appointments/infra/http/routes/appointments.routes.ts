import { Router } from 'express';
import {celebrate,Segments,Joi} from 'celebrate';
import AppointmentController from '../controllers/AppointmentController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentController from '@modules/appointments/infra/http/controllers/ProvidersAppointmentsController'
const appoitmentRouter = Router();

const appointmentController = new AppointmentController();
const providerAppointmentController =  new ProviderAppointmentController();

appoitmentRouter.use(ensureAuthenticated);

appoitmentRouter.get('/me',providerAppointmentController.index);

appoitmentRouter.post('/',celebrate({
  [Segments.BODY]:{
    provider_id:Joi.string().uuid().required(),
    date:Joi.date(),
  }

}),appointmentController.create);

export default appoitmentRouter;
