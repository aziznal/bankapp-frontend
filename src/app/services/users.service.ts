import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUserData(): Observable<User> {
    return this.http.get<User>(environment.API.USERS.GET_USER_DATA);
  }

  getSimplifiedTransactions(): Observable<{ date: Date; amount: number }[]> {
    return this.http.get<any>(
      environment.API.USERS.GET_SIMPLIFIED_TRANSACTIONS
    );
  }
}
