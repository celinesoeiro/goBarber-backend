import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/Users';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatar_filename }: Request): Promise<User>{
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar){
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    } 

    // Salvando o avatar
    user.avatar = avatar_filename;

    await usersRepo.save(user);

    return user;
  }

}

export default UpdateUserAvatarService;