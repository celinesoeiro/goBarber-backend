import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

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
});

usersRouter.patch(
  '/avatar', 
  ensureAuth, 
  upload.single('avatar'), 
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

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
});

export default usersRouter;
