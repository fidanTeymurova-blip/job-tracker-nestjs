import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInterviewDto) {
    // Job mövcuddurmu?
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new NotFoundException('İş tapılmadı');

    // İşin statusunu INTERVIEW et
    await this.prisma.job.update({
      where: { id: dto.jobId },
      data: { status: 'INTERVIEW' },
    });

    return this.prisma.interview.create({
      data: {
        jobId: dto.jobId,
        date: new Date(dto.date),
        type: dto.type || 'technical',
        notes: dto.notes,
      },
    });
  }

  async findByJob(jobId: number) {
    return this.prisma.interview.findMany({
      where: { jobId },
      orderBy: { date: 'asc' },
    });
  }

  async remove(id: number) {
    const interview = await this.prisma.interview.findUnique({ where: { id } });
    if (!interview) throw new NotFoundException('Müsahibə tapılmadı');
    return this.prisma.interview.delete({ where: { id } });
  }
}