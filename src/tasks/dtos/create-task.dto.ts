import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Title must be at most 100 characters long' })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the task management API',
    maxLength: 300,
  })
  @IsString()
  @MaxLength(300, { message: 'Description must be at most 300 characters long' })
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.Pending,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
