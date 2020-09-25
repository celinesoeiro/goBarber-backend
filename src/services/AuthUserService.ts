import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne({ where: { email } });

    if (!user){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // sign( {payload}, 'hash', {infos adicionais} )
    // hash gerado usando o md5.cz
    // Para traduzir o token acessa jwt.io

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn 
    });

    return {
      user,
      token
    };
  }
}

export default AuthUserService;