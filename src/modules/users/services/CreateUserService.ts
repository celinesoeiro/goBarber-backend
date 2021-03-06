import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService{
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute( { name, email, password }: IRequest ): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists){
      throw new AppError('This email address is already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return user;

  }
}

export default CreateUserService;
