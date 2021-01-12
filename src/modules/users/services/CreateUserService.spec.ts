import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
    );

    const user = await createUser.execute({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user when the email is already used', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
    );

    await createUser.execute({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    expect(createUser.execute({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

});
