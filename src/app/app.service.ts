import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  rootURL = 'https://habit-tracker-backend.onrender.com/api';

  getUsers() {
    return this.http.get<User[]>(this.rootURL + '/users');
  }
  addUser(user: User) {
    return this.http.post(this.rootURL + '/user', { user: user });
  }
  deleteUser(index: number) {
    return this.http.delete(this.rootURL + '/user/' + index, {
      responseType: 'text',
    });
  }
}
