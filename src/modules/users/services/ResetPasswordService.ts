import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService{
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private usertokensRepository: IUserTokenRepository,
  ){}

  public async execute( { token, password }: IRequest ): Promise<void> {
    const userToken = await this.usertokensRepository.findByToken(token);

    if (!userToken){
      throw new AppError('User token does not exist')
    }

    const user = await this.userRepository.findById(userToken?.user_id);

    if (!user){
      throw new AppError('User does not exist')
    }

    user.password = password;

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
