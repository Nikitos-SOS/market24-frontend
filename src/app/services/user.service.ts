import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8080/user';
  private users: User[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  private createAuthenticationHeader(){

    return "Bearer "+ localStorage.getItem('token');
  }

  public getUsers(): Observable<User[]>{

    // let headers = new HttpHeaders();
    // headers.append("Authorization", this.createAuthenticationHeader());

    const options = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`),
    };

    return this.http.get<any>(`${this.apiServerUrl}/all`, options);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/update`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${userId}`);
  }
}
