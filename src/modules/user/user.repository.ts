import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedUsers, UserFindAll } from 'src/@types/user/paginated-users';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10): Promise<PaginatedUsers> {
    const skip = (page - 1) * limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        include: {
          enterprise: true,
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    const usersFormatted: UserFindAll[] = users.map(
      ({ password, ...user }) => ({
        ...user,
        role: user.role as RoleEnum,
      }),
    );

    return { users: usersFormatted, total };
  }

  async findOne(id: string): Promise<UserFindAll | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        enterprise: true,
      },
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, role: user.role as RoleEnum };
  }
}
