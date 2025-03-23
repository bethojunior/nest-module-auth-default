import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

export const TeacherRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.TEACHER) {
      throw new ForbiddenException('Access denied. Only TEACHER are allowed.');
    }

    return user;
  },
);
