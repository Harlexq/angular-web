import { Injectable } from '@angular/core';
import { BaseService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: any;

  constructor(private http: BaseService) {}

  postUser(data: any, callBack: (res: any) => void) {
    this.http.post('users', data, callBack);
  }

  getUser(email: any, callBack: (res: any) => void) {
    this.http.get(`users?email=${email}`, callBack);
  }
}
