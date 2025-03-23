import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

export const EnterpriseRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.ENTERPRISE) {
      throw new ForbiddenException(
        'Access denied. Only ENTERPRISE are allowed.',
      );
    }

    return user;
  },
);
