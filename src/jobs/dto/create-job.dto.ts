import {
  IsString, IsInt, IsOptional, IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum JobStatus {
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED',
  GHOSTED = 'GHOSTED',
}

export class CreateJobDto {
  @ApiProperty({ example: 'Junior Backend Developer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1, description: 'Şirkət ID-si' })
  @IsInt()
  companyId: number;

  @ApiProperty({ enum: JobStatus, default: JobStatus.APPLIED })
  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @ApiProperty({ example: 'Boomering vasitəsilə müraciət etdim', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}