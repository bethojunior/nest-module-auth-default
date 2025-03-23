import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JediModule } from './modules/jedi/main';
import { StudentModule } from './modules/student/main';
import { TeacherModule } from './modules/teacher/main';
import { EnterpriseModule } from './modules/enterprise/main';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JediModule,
    StudentModule,
    TeacherModule,
    EnterpriseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
