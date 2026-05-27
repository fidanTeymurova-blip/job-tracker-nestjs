import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    return this.prisma.company.create({ data: dto });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: { _count: { select: { jobs: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { jobs: true },
    });

    if (!company) throw new NotFoundException('Şirkət tapılmadı');
    return company;
  }

  async update(id: number, dto: Partial<CreateCompanyDto>) {
    await this.findOne(id);
    return this.prisma.company.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({ where: { id } });
  }
}