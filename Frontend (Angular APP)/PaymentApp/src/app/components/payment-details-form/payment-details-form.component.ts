import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';
import { NgForm } from '@angular/forms';
import { PaymentDetails } from 'src/app/models/PaymentDetails';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrls: ['./payment-details-form.component.css']
})
export class PaymentDetailsFormComponent implements OnInit {
  @Input() isForm = true;

  @Output() clickEventHandler = new EventEmitter<boolean>();
  isNotFirst = false;

  constructor(public service: PaymentDetailsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  a = 0;
  b = 0; 
  c = 0;
  d = 0;

  inputData = new FormGroup({
    cardOwnerName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern('[0-9]*')
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern('[0-9]*')
    ]),
    expirationDate: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
      Validators.pattern('[0-9/]*')
    ])
  })

  get cardOwnerName() {
    return this.inputData.get('cardOwnerName')
  }

  get cardNumber() {
    return this.inputData.get('cardNumber')
  }

  get securityCode() {
    return this.inputData.get('securityCode')
  }

  get expirationDate() {
    return this.inputData.get('expirationDate')
  }

  handleInput() {
    this.isNotFirst = true;
  }

  onButtonClick(form: any) {
    this.resetForm(form);
    this.clickEventHandler.emit(true);
  }

  onSubmit(form: any) {
    if (this.service.formData.paymentDetailId == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form); 
    }
    this.onButtonClick(form)
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Payment System')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Payment System')
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetails();
  }

}
