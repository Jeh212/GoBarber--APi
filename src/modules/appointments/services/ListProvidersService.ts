import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/model/ICacheProvider'
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {

     let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`);

     if(!users){
       users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      console.log('A query no banco foi feita!')
      await this.cacheProvider.save(`providers-list:${user_id}`,users);

     }

     return users;
  }
}

export default ListProviderService;
