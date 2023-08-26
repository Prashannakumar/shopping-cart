import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class TokeninterceptorService implements HttpInterceptor {

  constructor(public userSer : UsersService) { }

  intercept(req : HttpRequest<any>, next : HttpHandler)
  {
   // console.log(req);
    console.log("Your Req On its way");

    var tokenizedReq = req.clone({
      setHeaders : {
        myauthtoken : (this.userSer.getMyToken()) ? this.userSer.getMyToken() : ''
      }
    });

    return next.handle(tokenizedReq);
  }
}
