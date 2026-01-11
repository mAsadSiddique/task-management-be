import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { SharedService } from 'src/shared/shared.service';
import { ExceptionService } from 'src/shared/exception.service';
import { RESPONSE_MESSAGES } from 'src/utils/enums';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private readonly sharedService: SharedService,
    private readonly exceptionService: ExceptionService,
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

  async findAll() {
    try {
      const tasks = await this.prisma.task.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return this.sharedService.sendResponse(RESPONSE_MESSAGES.TASKS_FETCHED, {
        tasks,
      });
    } catch (error) {
      this.sharedService.sendError(error, this.findAll.name);
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        this.exceptionService.sendNotFoundException(
          RESPONSE_MESSAGES.TASK_NOT_FOUND,
        );
      }

      return this.sharedService.sendResponse(RESPONSE_MESSAGES.TASK_FETCHED, {
        task,
      });
    } catch (error) {
      this.sharedService.sendError(error, this.findOne.name);
    }
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    try {
      // Validate that at least one field is provided for update
      const hasFieldsToUpdate =
        data.title !== undefined ||
        data.description !== undefined ||
        data.status !== undefined;

      if (!hasFieldsToUpdate) {
        this.exceptionService.sendBadRequestException(
          RESPONSE_MESSAGES.NO_FIELDS_TO_UPDATE,
        );
      }

      const existingTask = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        this.exceptionService.sendNotFoundException(
          RESPONSE_MESSAGES.TASK_NOT_FOUND,
        );
      }

      const task = await this.prisma.task.update({
        where: { id },
        data,
      });

      return this.sharedService.sendResponse(RESPONSE_MESSAGES.TASK_UPDATED, {
        task,
      });
    } catch (error) {
      this.sharedService.sendError(error, this.updateTask.name);
    }
  }

  async deleteTask(id: string) {
    try {
      const existingTask = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        this.exceptionService.sendNotFoundException(
          RESPONSE_MESSAGES.TASK_NOT_FOUND,
        );
      }

      await this.prisma.task.delete({
        where: { id },
      });

      return this.sharedService.sendResponse(RESPONSE_MESSAGES.TASK_DELETED, {});
    } catch (error) {
      this.sharedService.sendError(error, this.deleteTask.name);
    }
  }
}
