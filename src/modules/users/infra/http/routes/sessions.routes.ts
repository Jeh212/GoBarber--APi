import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', celebrate({
  [Segments.BODY]:{
  email:Joi.string().required().email(),
  password:Joi.string().required(),

  },
}),sessionController.create);

export default sessionsRouter;
