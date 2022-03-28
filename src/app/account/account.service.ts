import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
var baseUrl = "https://localhost:44308/api";
@Injectable({ providedIn: 'root' })
export class AccountService {
    // public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      
    }

    public get userValue(): User  {
        return JSON.parse(localStorage.getItem('user')!) as User;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${baseUrl}/account/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${baseUrl}/Account/Register`, user);
    }
}