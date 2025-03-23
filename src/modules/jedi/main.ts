import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { JediEnterpriseModule } from './enterprise/enterprise.module';
import { JediClassModule } from './class/class.module';
import { JediStudentModule } from './student/student.module';

@Module({
  imports: [
    PrismaModule,
    JediEnterpriseModule,
    JediClassModule,
    JediStudentModule,
  ],
  exports: [JediEnterpriseModule, JediClassModule, JediStudentModule],
})
export class JediModule {}
