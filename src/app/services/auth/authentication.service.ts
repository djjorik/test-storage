import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { contentHeaders } from './headers';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {

    public token: string;
    private loggedIn$ = new BehaviorSubject<boolean>(this.storage.getToken() != null ? true : false);

    constructor(
        private http: HttpClient,
        private storage: LocalStorageService
    ) {
        // set token if saved in local storage
        this.token = this.storage.getToken();
    }

    login(username, password): void {

        this.http.post('/authentication/login', { username: username, password: password }, { headers: contentHeaders })
            .subscribe((response: any) => {
                this.setToken(response);
            }, () => {
                this.loggedIn$.next(false);
            });

    }


    setToken(response: any) {
        // login successful if there's a jwt token in the response
        const accessToken = response && response.accessToken;

        if (accessToken) {
            // set token property
            this.token = accessToken;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            this.storage.setToken(accessToken);
            this.storage.setUser(response.user);

            // return true to indicate successful login
            this.loggedIn$.next(true);
        } else {
            // return false to indicate failed login
            this.loggedIn$.next(false);
        }
    }

    isLoggedIn(): BehaviorSubject<boolean> {
        return this.loggedIn$;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = '';
        this.storage.removeToken();
        this.storage.removeUser();
        this.loggedIn$.next(false);
    }

}
