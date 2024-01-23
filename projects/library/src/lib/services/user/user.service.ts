import { Injectable } from '@angular/core';
import { BaseService } from '../services';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | null = null;

  constructor(private http: BaseService) {}

  getUser(email: string, callBack: (res: User[]) => void) {
    this.http.get(`users?email=${email}`, (res) => callBack(res as User[]));
  }

  postUser(model: User, callBack: (res: User) => void) {
    this.http.post('users', model, (res) => callBack(res as User));
  }

  getUserInfo(token: string, callBack: (user: User) => void) {
    this.http.get(`users?token=${token}`, (res) => {
      const user = res[0] as User;
      callBack(user);
    });
  }
}
