import { Injectable } from '@angular/core';
import { BaseService } from '../services';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | null = null;

  constructor(private http: BaseService) {}

  postUser(data: User, callBack: (res: any) => void) {
    this.http.post('users', data, callBack);
  }

  getUser(email: string, callBack: (res: any) => void) {
    this.http.get(`users?email=${email}`, callBack);
  }
}
