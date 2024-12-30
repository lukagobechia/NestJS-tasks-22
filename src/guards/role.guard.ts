import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class IsViewer implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.headers['role'] as string;

    if (!role) {
      throw new BadRequestException('Role is not provided');
    }

    if (!['admin', 'isViewer'].includes(role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}

export class IsAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.headers['role'] as string;

    if (!role) {
      throw new BadRequestException('Role is not provided');
    }

    if (!['admin'].includes(role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
