import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class StudentRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.STUDENT)
      throw new ForbiddenException('Access denied. Only STUDENT are allowed.');

    return true;
  }
}
