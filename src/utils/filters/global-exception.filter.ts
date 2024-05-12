import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof Error ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal server error',
    });
  }
}
