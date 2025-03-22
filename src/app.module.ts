import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    StudentModule,
    EnterpriseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
