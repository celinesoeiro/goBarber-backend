import { Request, Response} from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const userResp = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatar_filename: request.file.filename,
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
