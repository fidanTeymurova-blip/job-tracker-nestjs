import { IsInt, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewDto {
  @ApiProperty({ example: 1, description: 'Job ID' })
  @IsInt()
  jobId: number;

  @ApiProperty({ example: '2026-06-15T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'technical', default: 'technical' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ example: 'NestJS, PostgreSQL sualları soruşulacaq', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}