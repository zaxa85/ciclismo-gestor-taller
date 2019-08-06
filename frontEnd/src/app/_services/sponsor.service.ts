import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sponsor } from '../_shared/models';

@Injectable()
export class SponsorService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/sponsor');
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/sponsor/' + id);
    }

    create(sponsor: Sponsor) {
        return this.http.post(this.API_URL + '/api/sponsor',sponsor);
    }

    update(sponsor: Sponsor) {
        return this.http.put(this.API_URL + '/api/sponsor/' + sponsor.id, sponsor);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/sponsor/' + id);
    }
}