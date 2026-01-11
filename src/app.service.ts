import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `It's task management be`;
  }
  getHealth(): string {
    return `It's task management be`;
  }
}
