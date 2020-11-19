import AppErro from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUsersRepository;
let listProviderService: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUsersRepository();
		fakeCacheProvider =  new FakeCacheProvider();
		listProviderService = new ListProviderService(fakeUserRepository, fakeCacheProvider);
	});
	it('Should be able to list the profiles!', async () => {
		const user1 = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@exemple.com',
			password: '123456'
		});

		const user2 = await fakeUserRepository.create({
			name: 'John tre',
			email: 'johndoe@exemple.com',
			password: '123456'
		});

		const logedUser = await fakeUserRepository.create({
			name: 'John qua',
			email: 'johndoe@exemple.com',
			password: '123456'
		});

		const providers = await listProviderService.execute({
			user_id: logedUser.id
		});

		expect(providers).toEqual([ user1, user2 ]);
	});
});
