import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  constructor(
    private userRepository: IUserRepository
  ){}

  public async execute( { name, email, password }: IRequest ): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists){
      throw new AppError('This email address is already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return user;

  }
}

export default CreateUserService;
