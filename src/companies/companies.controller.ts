import {
  Controller, Get, Post, Put, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiBearerAuth, ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Şirkət əlavə et' })
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Bütün şirkətləri gətir' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Şirkəti ID ilə gətir' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Şirkəti yenilə' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Şirkəti sil' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}