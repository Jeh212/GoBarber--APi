import { EntityRepository, getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import  IUsersRepository from  '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  // 

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = this.ormRepository.findOne({ where: { email } });

    return findEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
export default UsersRepository;
