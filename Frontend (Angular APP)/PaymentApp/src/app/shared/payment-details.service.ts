import { Injectable } from '@angular/core';
import { PaymentDetails } from 'src/app/models/PaymentDetails';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:5000/api/PaymentDetail'
  formData: PaymentDetails = new PaymentDetails();
  list!: PaymentDetails[];

  postPaymentDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putPaymentDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as PaymentDetails[]);
  }

}
