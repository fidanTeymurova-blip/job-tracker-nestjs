import {
  Injectable, NotFoundException, ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateJobDto) {
    return this.prisma.job.create({
      data: { ...dto, userId },
      include: { company: true },
    });
  }

  async findAll(userId: number, status?: string) {
    return this.prisma.job.findMany({
      where: {
        userId,
        ...(status && { status: status as any }),
      },
      include: {
        company: true,
        interviews: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { company: true, interviews: true },
    });

    if (!job) throw new NotFoundException('İş tapılmadı');
    if (job.userId !== userId) throw new ForbiddenException('Buna icazəniz yoxdur');

    return job;
  }

  async update(id: number, userId: number, dto: UpdateJobDto) {
    await this.findOne(id, userId);
    return this.prisma.job.update({
      where: { id },
      data: dto,
      include: { company: true },
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.job.delete({ where: { id } });
  }

  async getStats(userId: number) {
    const jobs = await this.prisma.job.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    });

    const total = await this.prisma.job.count({ where: { userId } });

    return { total, byStatus: jobs };
  }
}