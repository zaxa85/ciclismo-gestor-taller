import { Injectable } from '@angular/core';
 
import { environment } from '../../environments/environment';
import { Expenditure } from '../_shared/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ExpenditureService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<Expenditure[]>(this.API_URL + '/api/expenditure');
    }

    getByStatus(status: number) {    
        return this.http.get<Expenditure[]>(this.API_URL + '/api/expenditure', {
            params: {where: JSON.stringify({ status: status }) }
        })
    }

    getByPeriod(period: string) {       
        return this.http.get(this.API_URL + '/api/expenditure', {
            params: {where: JSON.stringify({ id_fk_period_id: period }) }
        })
    }

    getExpendituresPerPeriod(period: string) {  
        return this.http.get(this.API_URL + '/api/expenditure/getExpendituresPerPeriod?period=' + period + '&status=1');
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/expenditure/' + id);
    }

    create(expenditure: Expenditure) {
        return this.http.post(this.API_URL + '/api/expenditure/', expenditure);
    }
 
    create2(expenditure: Expenditure) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {
            headers: headers
        };
        return this.http.post(this.API_URL + '/api/atletas/', expenditure, options);
    }

    update(expenditure: Expenditure) {
        return this.http.patch(this.API_URL + '/api/expenditure/' + expenditure.id, expenditure);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/expenditure/' + id)
    }
}