import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate!', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jean Carlos',
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });

    
    expect(response).toHaveProperty('token');

    expect(response.user).toEqual(user);
  });
  it('Should not be able to authenticate with non existing user!', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

   authenticateUser.execute({
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });

    
    expect(
      authenticateUser.execute({
        email: 'jeandub1@hotmail.com',
        password: '123456',
      })
  
    ).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to authenticate with wrong password!', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

  await createUser.execute({
      name: 'Jean Carlos',
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });

    expect(authenticateUser.execute({
      email: 'jeandub1@hotmail.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError)
  })
});
