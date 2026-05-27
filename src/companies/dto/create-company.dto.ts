import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Google' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://google.com', required: false })
  @IsUrl()
  @IsOptional()
  website?: string;
}