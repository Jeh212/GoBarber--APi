
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import {container} from 'tsyringe'

export default class UserAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {

    const userid = request.user.id;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)
    const user = await updateUserAvatar.execute({
      user_id: userid,
      avatarFileName: request.file.filename,
    });
    // delete user.password;

    return response.json(classToClass(user));
  }
}
