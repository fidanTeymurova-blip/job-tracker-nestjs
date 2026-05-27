import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe, UseGuards, Request,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiBearerAuth,
  ApiQuery, ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni iş müraciəti əlavə et' })
  create(@Request() req, @Body() dto: CreateJobDto) {
    return this.jobsService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Bütün müraciətlərimi gətir' })
  @ApiQuery({ name: 'status', required: false, enum: ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'GHOSTED'] })
  findAll(@Request() req, @Query('status') status?: string) {
    return this.jobsService.findAll(req.user.id, status);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Statistika: status üzrə saylar' })
  getStats(@Request() req) {
    return this.jobsService.getStats(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Müraciəti ID ilə gətir' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.jobsService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Müraciəti yenilə (status dəyiş)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Müraciəti sil' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.jobsService.remove(id, req.user.id);
  }
}