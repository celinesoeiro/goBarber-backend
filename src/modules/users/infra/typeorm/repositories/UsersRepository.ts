import { getRepository, Repository } from 'typeorm';

import User from "@modules/users/infra/typeorm/entities/Users";

import IUserRepository from '@modules/users/repositories/IUserRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
  }

  /** CREATE */
  public async create({ name, email, password }: ICreateUserDTO): Promise<User>{
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  /** FIND BY ID */
  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  /** FIND BY EMAIL */
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    })

    return findUser;
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;