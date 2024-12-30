import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';

@Injectable()
export class CheckSubscription implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    const userId = Number(headers['user-id']);
    if (!userId || isNaN(userId)) {
      throw new ForbiddenException('Invalid or missing User ID in headers.');
    }

    const user = this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const subscription = user.subscription;
    try {
      const subscriptionDate = new Date(subscription);

      if (isNaN(subscriptionDate.getTime())) {
        throw new ForbiddenException('Invalid subscription date format.');
      }

      if (subscriptionDate > new Date()) {
        request['subscriptionStatus'] = 'valid';
        return true;
      }
    } catch (error) {
      console.error(error);

      throw new ForbiddenException('Error while validating subscription.');
    }
    return true;
  }
}
