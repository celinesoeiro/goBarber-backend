import { Router } from 'express';
import { container } from 'tsyringe';

import AuthUserService from '@modules/users/services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUser = container.resolve(AuthUserService);

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
});

export default sessionsRouter;
