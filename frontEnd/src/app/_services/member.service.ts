import { Injectable } from '@angular/core';
 
 import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_shared/models';

@Injectable()
export class MemberService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Member[]>(this.API_URL + '/api/member');
    }

    getByStatus(status: number) {    
        return this.http.get<Member[]>(this.API_URL + '/api/member', {
            params: {where: JSON.stringify({ status: status }) }
        })
    }
 
    getById(id: number) {
        return this.http.get(this.API_URL + '/api/member/' + id);
    }

    create(member: Member) {
        return this.http.post(this.API_URL + '/api/member/', member);
    }

    update(member: Member) {
        return this.http.patch(this.API_URL + '/api/member/' + member.id, member);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/member/' + id);
    }
}