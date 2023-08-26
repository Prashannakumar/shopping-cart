import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http : HttpClient) { }

  userRegistration(data:any)
  {
   return this.http.post<string>("http://localhost:3000/register", data);
  }

  userLogin(data:any) {
    //console.log(data);

    return this.http.post<string>("http://localhost:3000/login", data);
  }

  isLoggedIn()
  {
    return !!localStorage.getItem("token");
  }

  getMyToken()
  {
    return localStorage.getItem("token");
  }
}
