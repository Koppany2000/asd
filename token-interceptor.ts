import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from './auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
            if(req.headers.get("skip")){
                return next.handle(req);
            }
            let tokenizedReq = req.clone({
                setHeaders:{
                    Authorization:`Bearer ${this.authService.getJwtToken()}`
                }
            })
            console.log(tokenizedReq.headers);
            return next.handle(tokenizedReq);
    }
}
