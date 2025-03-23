import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

export const JediRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== RoleEnum.JEDI) {
      throw new ForbiddenException('Access denied. Only JEDI are allowed.');
    }

    return user;
  },
);
