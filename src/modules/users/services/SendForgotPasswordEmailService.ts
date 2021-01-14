import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService{
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private usertokensRepository: IUserTokenRepository,
  ){}

  public async execute( { email }: IRequest ): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user){
      throw new AppError('User does not exist')
    }

    await this.usertokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'pedido de recuperação de senha recebido')

  }
}

export default SendForgotPasswordService;
