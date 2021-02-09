import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(
      fakeUsersRepository,
    );
  });

  it("should be able to show the profile", async () => {
    const user = await fakeUsersRepository.create({
      email: 'janedoe@maail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    const showProfile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showProfile.name).toBe('Jane Doe');
    expect(showProfile.email).toBe('janedoe@maail.com');
  });

  it("should not be able to show the profile of non-existent users", async () => {
    await expect(showProfileService.execute({
      user_id: 'non-existent-user-id',
    })).rejects.toBeInstanceOf(AppError);
  });

});
