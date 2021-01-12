import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ){}

  public async execute({ user_id, avatar_filename }: Request): Promise<User>{
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar){
      // Deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar);
    }

    // Salvando o avatar
    const fileName = await this.storageProvider.saveFile(avatar_filename);
    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }

}

export default UpdateUserAvatarService;
