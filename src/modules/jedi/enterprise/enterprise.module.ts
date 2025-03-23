import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseRepository } from './enterprise.repository';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService, EnterpriseRepository],
})
export class JediEnterpriseModule {}
