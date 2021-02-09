import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ){}

  public async execute({ user_id }: Request): Promise<User>{
    const user = await this.userRepository.findById(user_id);

    if (!user){
      throw new AppError('User not found');
    }

    return user;
  }

}

export default ShowProfileService;
