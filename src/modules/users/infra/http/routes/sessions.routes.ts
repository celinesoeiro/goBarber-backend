import { Router } from 'express';

import AuthUserService from '@modules/users/services/AuthUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const userRepository = new UsersRepository();
  const authUser = new AuthUserService(userRepository);

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
