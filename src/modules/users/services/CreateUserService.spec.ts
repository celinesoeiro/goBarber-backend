import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user when the email is already used', async () => {
    await createUser.execute({
      email: 'janedoe@mail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    await expect(createUser.execute({
      email: 'janedoe@mail.com',
      name: 'Jane Doe',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

});
