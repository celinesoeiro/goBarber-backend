import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUser = new AuthUserService();

    const { user, token } = await authUser.execute({
      email,
      password
    });

    const userLogged = {
      id: user.id, 
      name: user.name, 
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

    return response.json({ userLogged, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
