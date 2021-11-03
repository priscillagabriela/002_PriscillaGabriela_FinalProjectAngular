import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';
import { NgForm } from '@angular/forms';
import { PaymentDetails } from 'src/app/models/PaymentDetails';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Input() isHome = true;

  @Output() clickEventHandler = new EventEmitter<boolean>();
  @Output() clickEventHandler2 = new EventEmitter<boolean>();

  constructor(public service: PaymentDetailsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetails) {
    this.clickEventHandler2.emit(true);
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onButtonClick() {
    this.clickEventHandler.emit(true);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePaymentDetail(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Payment System');
          },
          err => { console.log(err) }
        )
    }
  }

}
