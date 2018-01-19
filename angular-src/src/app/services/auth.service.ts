import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  constructor(private http:Http, private jwtHelperService: JwtHelperService) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',  user,{headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',  user,{headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/authenticate', {headers: headers})
    .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter()

    if (!token) {
      return false
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)

    return !tokenExpired
  }
  
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
