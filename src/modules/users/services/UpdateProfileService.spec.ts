import AuthenticateUserService from './AuthenticateUserService';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import UpdateProfile from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfile(fakeUserRepository, fakeHashProvider);
  });
  it('Should be able to update the avatar!', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johndoe@exemple.com',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('johndoe@exemple.com');
  });

  it('Should be able to change to another user E-mail Account!', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johndoe@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password!', async () => {
    
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id:user.id,
      name: 'John tre',
      email: 'johndoe@exemple.com',
      old_password: '123456',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError)

  
  });

  it('Should not be able to update the password with wrong old password!', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id:user.id,
      name: 'John tre',
      email: 'johntre@exemple.com',
      old_password: 'wrong-old-password',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)


  });

});
