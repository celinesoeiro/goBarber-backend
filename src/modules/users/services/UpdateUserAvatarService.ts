import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  constructor(
    private userRepository: IUserRepository
  ){}

  public async execute({ user_id, avatar_filename }: Request): Promise<User>{
    const user = await this.userRepository.findById(user_id);

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

    await this.userRepository.save(user);

    return user;
  }

}

export default UpdateUserAvatarService;
