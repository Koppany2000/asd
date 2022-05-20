import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, timeout } from 'rxjs';
import { LoginResponse } from './login-response.payload';
import { LoginRequestPayload } from './LoginRequestPayload';
import { UserRole } from './UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;

  userRole:UserRole;
  constructor(private httpClient: HttpClient,private localStorage: LocalStorageService
  ) { 
    
  }

  setLoggedIn(value: boolean){
    this.loggedInStatus= value;
    this.localStorage.store('loggedIn',this.loggedInStatus);
  }

  isLoggedIn():boolean{
    return this.localStorage.retrieve('loggedIn');
  }
  isAdmin():boolean{
    if(this.localStorage.retrieve('role')==='ROLE_ADMIN'){
      return true;
    }
    return false;
  }
  
  login(loginRequestPayload:LoginRequestPayload): Observable<boolean>{
   
    this.getUsers(loginRequestPayload.username).subscribe((data:UserRole) => {
      
      this.userRole=data
      this.localStorage.store('role',this.userRole.role)
    });
    
    
    
    
    
     
    return this.httpClient.post<LoginResponse>('http://localhost:8080/login',loginRequestPayload,{headers:{skip:"true"}})
    .pipe(map(data => {
      this.localStorage.store('authenticationToken',data.jwt);
      this.setLoggedIn(true)
      this.localStorage.store('username',loginRequestPayload.username)
      return true;
    }));
  }
  logout(): void{
    this.setLoggedIn(false);
    this.localStorage.clear('authenticationToken');
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
 }
 getUsers(username:string):Observable<UserRole>{
  return this.httpClient.get<UserRole>('http://localhost:8080/api/users/roles/'+username,{headers:{skip:"true"}});
    
}



}
