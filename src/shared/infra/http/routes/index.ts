import { Router } from 'express';
import appoitmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appoitmentRoutes);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRoutes);
routes.use('/password',passwordRoutes)
routes.use('/profile',profileRouter)

export default routes;
