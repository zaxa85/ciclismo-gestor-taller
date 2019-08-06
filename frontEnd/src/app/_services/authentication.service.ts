import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

 
@Injectable()
export class AuthenticationService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(login: string, password: string) {
        return this.http.get<any>(this.API_URL + '/api/users2/count', {
            params:
                { where: JSON.stringify({ login: login, password: password }) }
        }).pipe(map(user => {
            if (user && user.count > 0) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('currentUser', JSON.stringify({ login: login, password: password }));

                if (login === "admin") {
                    localStorage.setItem('userRoles', "admin");
                } else {
                    localStorage.setItem('userRoles', "user");
                }
            }
            else {
                throw "Usuario o contraseña incorrecto";
            }
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRoles');

    }
}