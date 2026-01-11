import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { SharedService } from './shared/shared.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TasksModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, SharedService],
})
export class AppModule {}
