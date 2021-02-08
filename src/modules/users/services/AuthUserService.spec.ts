import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthUserService from './AuthUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthUserService;

describe('AuthenticateUser', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    authenticateUser = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    authenticateUser = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@maail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'janedoe@maail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'janedoe@maail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect credentials', async () => {
    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@maail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'janedoe@maail.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
