import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHome = true;
  isForm = false;
  status = '';
  title = 'PaymentApp';

  changeStatus (isForm: boolean) {
    this.status = 'Add Payment Data';
    this.isHome = false;
    this.isForm = isForm;
  }

  changeStatus2 (isHome: boolean) {
    this.isForm = false;
    this.isHome = isHome;
  }

  changeStatus3 (isForm: boolean) {
    this.status = 'Edit Payment Data';
    this.isHome = false;
    this.isForm = isForm;
  }

  changeStatus4 (isHome: boolean) {
    this.isForm = false;
    this.isHome = isHome;
  }
}
