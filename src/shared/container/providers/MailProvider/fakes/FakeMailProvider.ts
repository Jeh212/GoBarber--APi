import IMailProvider from '../models/IMailProvider';
import ISEndMailDTO from '../dtos/ISendMailDTO'
interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: ISEndMailDTO[] = [];

  public async sendMail(message:ISEndMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
