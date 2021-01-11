import { Request, Response} from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const userResp = await createUser.execute({
      name,
      email,
      password,
    });

    const user = {
      id: userResp.id,
      name: userResp.name,
      email: userResp.email,
      avatar: userResp.avatar,
      created_at: userResp.created_at,
      updated_at: userResp.updated_at
    }

    return response.json(user);
  }

}
