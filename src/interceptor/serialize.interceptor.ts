import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handelar: CallHandler): Observable<any> {
    // run before the incomming request is come
    console.log('Before the incoming request', context);

    return handelar.handle().pipe(
      map((data) => {
        // run before the response is send
        console.log('before the res is send', data);
      }),
    );
  }
}
