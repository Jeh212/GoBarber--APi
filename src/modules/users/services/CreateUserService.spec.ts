import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';


let fakeUserRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let createUser:CreateUserService;


describe('CreateUserService', () => {

  beforeEach(()=>{
     fakeUserRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();

     createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

  })

  it('Should be able to create an user!', async () => {
   
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });
    console.log(user);
    expect(user).toHaveProperty('id');
  });

  it('Should NOT be able to create a new user with an existed E-mail!', async () => {
    
    await createUser.execute({
      name: 'John Doe',
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jeandub1@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
