import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request is on its way')
    console.log(req.url)
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    })
    return next.handle(modifiedRequest).pipe(
      tap(event => {
      console.log('event:', event);
      if(event.type === HttpEventType.Response){
        console.log('Response arrived:', event.body)
      }
    }))
  }
}
