import { Injectable } from '@angular/core';
 
 import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Income } from '../_shared/models';

@Injectable()
export class IncomeService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Income[]>(this.API_URL + '/api/income');
    }

    getByStatus(status: number) {    
        return this.http.get<Income[]>(this.API_URL + '/api/income', {
            params: {where: JSON.stringify({ status: status }) }
        })
    }
 
    getByPeriod(period: string) {       
        return this.http.get(this.API_URL + '/api/income', {
            params: {where: JSON.stringify({ id_fk_period_id: period }) }
        })
    }

    getIncomesPerPeriod(period: string) {  
        return this.http.get(this.API_URL + '/api/income/getIncomesPerPeriod?period=' + period + '&status=1');
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/income/' + id);
    }

    create(income: Income) {
        return this.http.post(this.API_URL + '/api/income/', income);
    }

    update(income: Income) {
        return this.http.patch(this.API_URL + '/api/income/' + income.id, income);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/income/' + id);
    }
}