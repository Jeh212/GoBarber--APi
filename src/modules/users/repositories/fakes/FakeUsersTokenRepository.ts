import { v4 as uuidv4 } from 'uuid';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUserTokenRepository {
  private userToken: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at:new Date(),
      updated_at:new Date(),
    });
    this.userToken.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = this.userToken.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}
export default FakeUserTokensRepository;
