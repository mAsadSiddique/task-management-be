import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { TaskStatus } from 'src/utils/enums';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @Length(1, 100, {
    message: 'Title must be between 1 and 100 characters long',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the task management API',
    minLength: 1,
    maxLength: 300,
  })
  @IsNotEmpty()
  @Length(1, 300, {
    message: 'Description must be between 1 and 300 characters long',
  })
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.Pending,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus, {
    message: `status should be a valid value from ${Object.values(TaskStatus).join(', ')}`,
  })
  status: TaskStatus;
}
