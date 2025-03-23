import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class EnterpriseRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.ENTERPRISE) {
      throw new ForbiddenException(
        'Access denied. Only ENTERPRISE are allowed.',
      );
    }

    return true;
  }
}
