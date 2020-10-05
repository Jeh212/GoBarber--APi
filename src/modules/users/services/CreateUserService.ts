import 'reflect-metadata'
import { inject, injectable } from 'tsyringe';


import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider'


interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider:IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const checkUserIfExist = await this.userRepository.findByEmail(email);

    if (checkUserIfExist) {
      throw new AppError('Email is already beeing used!', 400);
    }

    const hashedPassoword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassoword,
    });
    return user;
  }
}

export default CreateUserService;
