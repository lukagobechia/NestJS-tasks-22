import {
    CanActivate,
    ExecutionContext,
    NotFoundException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
  
  export class ExistUser implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request: Request & { userId: string } = context
        .switchToHttp()
        .getRequest();
  
      const userId = request.headers['user-id'];
  
      if (!userId) {
        throw new NotFoundException('User is not provided');
      }
  
      request.userId = userId as string;
      return true;
    }
  }
  