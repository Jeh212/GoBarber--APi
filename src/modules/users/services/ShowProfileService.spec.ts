import AuthenticateUserService from './AuthenticateUserService';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import UpdateProfile from './UpdateProfileService';
import ShowProfileService from './ShowProfileService';
import usersRouter from '../infra/http/routes/users.routes';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('Should be able to show the profile!', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@exemple.com');
  });


  it('Should be able to show not existing user!', async () => {
    

expect( showProfileService.execute({
      user_id: 'non-existing-user-id',
    }),
    ).rejects.toBeInstanceOf(AppError)

  });
  

});
