import {
  Controller, Get, Post, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@ApiTags('Interviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('interviews')
export class InterviewsController {
  constructor(private interviewsService: InterviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Müsahibə planlaşdır' })
  create(@Body() dto: CreateInterviewDto) {
    return this.interviewsService.create(dto);
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'İşə aid müsahibələri gətir' })
  findByJob(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.interviewsService.findByJob(jobId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Müsahibəni sil' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interviewsService.remove(id);
  }
}