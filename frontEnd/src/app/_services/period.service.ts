import { Injectable } from '@angular/core';
 
 import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Period } from '../_shared/models';

@Injectable()
export class PeriodService {

        private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Period[]>(this.API_URL + '/api/period');
    }

    getByStatus(status: number) {    
        return this.http.get<Period[]>(this.API_URL + '/api/period', {
            params: {where: JSON.stringify({ status: status }) }
        })
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/period/' + id);
    }

    create(period: Period) {
        return this.http.post(this.API_URL + '/api/period/', period);
    }

    update(period: Period) {
        return this.http.patch(this.API_URL + '/api/period/' + period.id, period);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/period/' + id);
    }
}