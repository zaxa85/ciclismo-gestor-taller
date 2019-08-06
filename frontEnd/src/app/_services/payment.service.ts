import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../_shared/models';

@Injectable()
export class PaymentService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPaymentControlByPeriod(year: string) {
        return this.http.get(this.API_URL + '/api/v_payment_control', {
            params: {where: JSON.stringify({ period: year }) }
        })
    }

    getPaymentBalanceByPeriod(year: string) {
        return this.http.get(this.API_URL + '/api/v_payment_balance', {
            params: {where: JSON.stringify({ id: year }) }
        })
    }

    geIncomeByType(year: string) {
        return this.http.get(this.API_URL + '/api/v_income_by_type', {
            params: {where: JSON.stringify({  id_fk_period_id: year }) }
        })
    }

    geExpenditureByType(year: string) {
        return this.http.get(this.API_URL + '/api/v_expenditure_by_type', {
            params: {where: JSON.stringify({  id_fk_period_id: year }) }
        })
    }
    
    getByMember(member: number, year: string) {
        return this.http.get(this.API_URL + '/api/payment', {
            params: {where: JSON.stringify({ id_fk_member_id: member, id_fk_period_id: year  }) }
        })
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/payment/' + id);
    }

    create(payment: Payment) {
        return this.http.post(this.API_URL + '/api/payment/', payment);
    }

    update(payment: Payment) {
        return this.http.patch(this.API_URL + '/api/payment/' + payment.id, payment);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/payment/' + id);
    }
}