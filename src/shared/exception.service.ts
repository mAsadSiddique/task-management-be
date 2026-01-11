import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  UnprocessableEntityException,
  BadRequestException,
  ForbiddenException,
  GoneException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ExceptionService {
  sendNotAcceptableException(message: string): never {
    throw new NotAcceptableException(message);
  }

  sendNotFoundException(message: string): never {
    throw new NotFoundException(message);
  }

  sendInternalServerErrorException(message: string): never {
    throw new InternalServerErrorException(message);
  }

  sendConflictException(message: string): never {
    throw new ConflictException(message);
  }

  sendUnprocessableEntityException(message: string): never {
    throw new UnprocessableEntityException(message);
  }

  sendBadRequestException(message: string): never {
    throw new BadRequestException(message);
  }

  sendForbiddenException(message: string): never {
    throw new ForbiddenException(message);
  }

  sendGoneException(message: string): never {
    throw new GoneException(message);
  }

  sendTooManyRequestsException(message: string): never {
    throw new HttpException(
      {
        message: message,
        error: 'Too Many Requests',
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
