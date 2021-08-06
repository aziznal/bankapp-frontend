import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  createNewUser(user: User): void {
    console.log('Created New User!');
    console.log(user);
  }
}
