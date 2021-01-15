import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456'
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '234567',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('234567');
    expect(updatedUser?.password).toBe('234567');
  });

  it('should not be able to reset the password with non-existint token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existent-token',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existint user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existent-user');

    await expect(
      resetPassword.execute({
        token,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if token was generated more than 2h ago', async () => {
    const user = await fakeUsersRepository.create({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456'
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      // hora atual + 3h -> pra garantir que as 2h passaram
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
      password: '234567',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });
});
