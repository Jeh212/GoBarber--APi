import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import SendForgotPasswordService from './SendForgotPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordService;

describe('SendForgotPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to recover de password using email account!', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Jean Carlos',
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });
    await sendForgotPasswordEmail.execute({
      email: 'jeandub1@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to receiver a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jeandub1@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const sendForgotPasswordEmail = new SendForgotPasswordService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    const user = await fakeUserRepository.create({
      name: 'Jean Carlos',
      email: 'jeandub1@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jeandub1@hotmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
