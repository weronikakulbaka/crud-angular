import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export const  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // BASE_PATH: 'http://localhost:8080'


 public username!: string;
 public password!: string;

 constructor(private http: HttpClient) {

 }

 authenticationService(username: string, password: string) {
   return this.http.get(`http://localhost:8080/api/v1/basicauth`,
     { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res: any) => {
       this.username = username;
       this.password = password;
       this.registerSuccessfulLogin(username, password);
     }));
 }

 createBasicAuthToken(username: string, password: string) {
   return 'Basic ' + window.btoa(username + ":" + password)
 }

 registerSuccessfulLogin(username: string, password: string) {
   sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
 }

 logout() {
   sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
   this.username = "";
   this.password = "";
 }

 isUserLoggedIn() {
   let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
   if (user === null) return false
   return true
 }

 getLoggedInUserName() {
   let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
   if (user === null) return ''
   return user
 }
}
