import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';
import { NgForm } from '@angular/forms';
import { PaymentDetails } from 'src/app/models/PaymentDetails';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() isHome = false;
  @Input() status = '';

  @Output() clickEventHandler = new EventEmitter<boolean>();
  
  constructor(public service: PaymentDetailsService) { }

  ngOnInit(): void {
  }

  onButtonClick() {
    this.service.formData = Object.assign({}, );
    this.clickEventHandler.emit(true);
  }
}
