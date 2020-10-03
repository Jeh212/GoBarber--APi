import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appoitmentRouter = Router();

const appointmentController = new AppointmentController();

appoitmentRouter.use(ensureAuthenticated);

// appoitmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find();

//   return response.json({ appointments });
// });

appoitmentRouter.post('/',appointmentController.create);

export default appoitmentRouter;
