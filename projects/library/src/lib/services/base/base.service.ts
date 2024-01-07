import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from '../errors/errors.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  apiUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  ngOnInit() {}

  get(api: string, callBack: (res: any) => void) {
    this.http.get(`${this.apiUrl + api}`, {}).subscribe({
      next: (res) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.errorHandler(err);
      },
    });
  }

  post(api: string, model: any, callBack: (res: any) => void) {
    this.http.post(`${this.apiUrl + api}`, model, {}).subscribe({
      next: (res) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.errorHandler(err);
      },
    });
  }
}
