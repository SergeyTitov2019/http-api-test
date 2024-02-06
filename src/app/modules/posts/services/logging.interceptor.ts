import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('LoggingInterceptor:', request.url)

    return next.handle(request).pipe(
      tap(event => {
        if(event.type === HttpEventType.Response){
          console.log('Incoming response:', event.body)
        }
      })
    )
  }
}
