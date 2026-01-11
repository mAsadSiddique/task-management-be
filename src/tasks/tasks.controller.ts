import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto, TaskResponseDto, UpdateTaskDto } from './dtos';
import { TaskService } from './tasks.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: TaskResponseDto,
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({
    description: 'The tasks have been successfully retrieved.',
    type: [TaskResponseDto],
  })
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the task',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'The task has been successfully retrieved.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task details' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the task',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'The task has been successfully updated.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid UUID format or no fields provided for update. Please provide at least one field (title, description, or status) to update.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the task',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'The task has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.deleteTask(id);
  }
}
