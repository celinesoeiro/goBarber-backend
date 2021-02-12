import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
    );
  });

  it("should be able to list the providers", async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'janedoe@mail.com',
      name: 'Jane Doe',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'annedoe@mail.com',
      name: 'Anne Doe',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

});
