import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Done = 'Done',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the task management API',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.Pending,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
