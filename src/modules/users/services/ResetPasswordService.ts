import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute( { token, password }: IRequest ): Promise<void> {
    const userToken = await this.usertokensRepository.findByToken(token);

    if (!userToken){
      throw new AppError('User token does not exist');
    }

    const user = await this.userRepository.findById(userToken?.user_id);

    if (!user){
      throw new AppError('User does not exist');
    }

    const tokenCreatedAt = userToken.created_at;
    const tokenExpirationDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), tokenExpirationDate)){
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
