import AuthenticateUserService from './AuthenticateUserService';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';


let fakeUserRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let fakeStorageProvider:FakeStorageProvider
let updateUserAvatar:UpdateUserAvatarService;
let authenticateUser:AuthenticateUserService;

describe('UpdateUserAvatar', () => {

  beforeEach(()=>{

     fakeUserRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();
     fakeStorageProvider = new FakeStorageProvider();

     updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );
     authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

     
  })

  it('Should be able to update the avatar!', async () => {
   
    const user = await fakeUserRepository.create({
      name:'Jean carlos',
      email:'jeandub1@hotmail.com',
      password:'123456'
    })


  await updateUserAvatar.execute({
      user_id:user.id,
      avatarFileName:'avatar.jpg',

    });

    expect(user.avatar).toBe('avatar.jpg')
  });
 
  it('Should NOT be able to update the avatar with not authneticated user!', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

     const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    
   
  await updateUserAvatar.execute({
      user_id:'non-existing-user',
      avatarFileName:'avatar.jpg',

    });


  });

  it('Should be able to delete Avatar!', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeStorageProvider = new FakeStorageProvider();

    const deletefIle = jest.spyOn(fakeStorageProvider,'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await fakeUserRepository.create({
      name:'Jean carlos',
      email:'jeandub1@hotmail.com',
      password:'123456'
    })

   
    await updateUserAvatar.execute({
      user_id:user.id,
      avatarFileName:'avatar.jpg',

    });
    await updateUserAvatar.execute({
      user_id:user.id,
      avatarFileName:'avatar2.jpg',
    });

    expect(deletefIle).toHaveBeenCalledWith('avatar.jpg')

    expect(user.avatar).toBe('avatar2.jpg')
  });
 
 


});
