import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

export const StudentRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.STUDENT) {
      throw new ForbiddenException('Access denied. Only STUDENT are allowed.');
    }

    return user;
  },
);
