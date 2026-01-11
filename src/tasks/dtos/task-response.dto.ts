import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'src/utils/enums';

export class TaskResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the task management API',
  })
  description: string;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: TaskStatus.Pending,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Timestamp when the task was created',
    example: '2026-01-11T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the task was last updated',
    example: '2026-01-11T12:00:00.000Z',
  })
  updatedAt: Date;
}
