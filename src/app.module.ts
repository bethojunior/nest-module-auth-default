import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { ClassModule } from './modules/class/class.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    StudentModule,
    EnterpriseModule,
    ClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
