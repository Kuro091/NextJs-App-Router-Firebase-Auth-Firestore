// userRoutes.ts
import { Router } from 'express';
import { ApiController } from '../controller/api';

export default (apiController: ApiController) => {
  const router = Router();

  router.post('/users', (req, res) => apiController.createUser(req, res));
  router.put('/users/:userId', (req, res) => apiController.updateUser(req, res));
  router.get('/users/:userId', (req, res) => apiController.fetchUser(req, res));

  return router;
};
