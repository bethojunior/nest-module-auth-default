import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class TeacherRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.TEACHER)
      throw new ForbiddenException('Access denied. Only TECAHER are allowed.');

    return true;
  }
}
