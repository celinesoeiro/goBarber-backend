import { getRepository, Repository } from 'typeorm';

import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor(){
    this.ormRepository = getRepository(UserToken);
  }

  /** FIND BY TOKEN */
  public async findByToken(token : string): Promise<UserToken | undefined>{
    const userToken = await this.ormRepository.findOne({
      where: { token }
    });

    return userToken;
  }

  /** GENERATE */
  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

}

export default UserTokensRepository;
