import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = 'http://localhost:8080'


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}/product/all`)
  }
  public addUser(user: User): Observable<User>{
    user.role = 'user';
    user.status = 'new';
    return this.http.post<User>(`${this.apiServerUrl}/user/add`,user)
  }

  public updateUser(user:User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/update`,user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  public loginUser(login: Login): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/user/login/${login.username}:${login.password}`)
  }

}
