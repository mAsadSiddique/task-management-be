import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskDto } from './dtos';
import { SharedService } from 'src/shared/shared.service';
import { RESPONSE_MESSAGES } from 'src/utils/enums';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private readonly sharedService: SharedService,
  ) {}

  async createTask(data: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({ data });

      return this.sharedService.sendResponse(RESPONSE_MESSAGES.TASK_CREATED, {
        task,
      });
    } catch (error) {
      this.sharedService.sendError(error, this.createTask.name);
    }
  }

  findAll() {
    return this.prisma.task.findMany();
  }
}
