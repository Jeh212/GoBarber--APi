import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProviderDTO from '../dtos/IFindAllProviderDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findAllProviders(data:IFindAllProviderDTO):Promise<User[]>;
}
