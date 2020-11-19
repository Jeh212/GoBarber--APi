import "reflect-metadata"
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
	
		authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
	});

	it('Should be able to authenticate!', async () => {
		const user = await fakeUserRepository.create({
			name: 'Jean Carlos',
			email: 'jeandub1@hotmail.com',
			password: '123456'
		});

		const response = await authenticateUser.execute({
			email: 'jeandub1@hotmail.com',
			password: '123456'
		});

		expect(response).toHaveProperty('token');

		expect(response.user).toEqual(user);
	});
	it('Should not be able to authenticate with non existing user!', async () => {
		authenticateUser.execute({
			email: 'jeandub1@hotmail.com',
			password: '123456'
		});

		expect(
			authenticateUser.execute({
				email: 'jeandub1@hotmail.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to authenticate with wrong password!', async () => {
		await fakeUserRepository.create({
			name: 'Jean Carlos',
			email: 'jeandub1@hotmail.com',
			password: '123456'
		});

		await expect(
			authenticateUser.execute({
				email: 'jeandub1@hotmail.com',
				password: 'wrong-password'
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
