import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  //Create own decorator , decorator are create as function
  return UseInterceptors(new SerializerInterceptor(dto));
}
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handelar: CallHandler): Observable<any> {
    // // run before the incomming request is come
    // console.log('Before the incoming request', context);

    return handelar.handle().pipe(
      map((data) => {
        // run before the response is send
        // console.log('before the res is send', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
