import { Injectable } from '@angular/core';
 
 import { environment } from '../../environments/environment';
import { User } from '../_shared/models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/user2');
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/users/' + id);
    }

    create(user: User) {
        return this.http.post(this.API_URL + '/api/users', user);
    }

    update(user: User) {
        return this.http.put(this.API_URL + '/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/users/' + id);
    }
}