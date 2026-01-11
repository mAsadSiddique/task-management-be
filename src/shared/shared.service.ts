import { Injectable } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { RESPONSE_MESSAGES } from 'src/utils/enums';

@Injectable()
export class SharedService {
  constructor(private readonly exceptionService: ExceptionService) {}

  /**
   * @description send response to client
   * @param message
   * @param data
   * @author Asad Siddique
   */
  sendResponse(message: string, data: any = {}) {
    return { message, data, status: 200 };
  }

  /**
   * @description send error to client
   * @param error
   * @param funName
   * @author Asad Siddique
   */
  sendError(error: any, funName: string) {
    if (!error.response) {
      this.exceptionService.sendInternalServerErrorException(
        RESPONSE_MESSAGES.SERVER_TEMPORY_DOWN,
      );
    }
    throw error;
  }
}
