import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should be able to update a user's avatar", async () => {
    const user = await fakeUsersRepository.create({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it("should be not able to update an avatar of non existent user", async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existent-user',
        avatar_filename: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when updating new one", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
