import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { JediRoleGuard } from 'src/http/guards/roles/jedi-role.guard';
@UseGuards(JwtAuthGuard, JediRoleGuard)
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    try {
      return await this.enterpriseService.create(createEnterpriseDto);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error creating enterprise',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.enterpriseService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return await this.enterpriseService.update(id, updateEnterpriseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.enterpriseService.remove(id);
  }
}
