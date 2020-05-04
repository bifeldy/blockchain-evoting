import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import User from 'src/app/_shared/models/user';
import { UserService } from 'src/app/_shared/services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/_shared/services/global.service';
import { ConfirmModalComponent } from 'src/app/_shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;

  currUser: User = null;

  urlExport = `${environment.apiUrl}/user/export?jwt=${localStorage.getItem(environment.tokenName)}`;

  etherValueRequested = null;
  etherValueRequestedError = false;

  submitted = false;

  constructor(
    private as: AuthService,
    private us: UserService,
    private router: Router,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    this.as.currentUser.subscribe(user => {
      this.currUser = user;
      if (!this.currUser) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  get currentUser() {
    return this.currUser;
  }

  get myCoinBase() {
    return this.us.myCoinBase;
  }

  typingEtherValue($event) {
    if (this.etherValueRequested < 1) {
      this.etherValueRequested = 1;
    } else if (this.etherValueRequested > 25) {
      this.etherValueRequested = 25;
    } else {
      this.etherValueRequested = parseInt(this.etherValueRequested, 10);
    }
  }

  sendRequestCoin() {
    this.submitted = true;
    this.etherValueRequestedError = false;
    if (this.etherValueRequested >= 1 && this.etherValueRequested <= 25) {
      this.us.requestCoin({
        amount: this.etherValueRequested
      }).subscribe(
        res => {
          this.gs.log('[RequestCoin]', res);
          this.submitted = false;
          this.etherValueRequested = null;
          this.confirmModal.showModal({
            callbackData: 'requestCoinFinished',
            title: `Request Coin`,
            body: JSON.stringify(res.result.message),
            submit: 'OK'
          });
        },
        err => {
          this.etherValueRequested = null;
          this.submitted = false;
          this.confirmModal.showModal({
            callbackData: 'requestCoinFailed',
            title: `Request Coin`,
            body: JSON.stringify(err.error.result.message),
            submit: 'OK'
          });
        }
      );
    } else {
      this.submitted = false;
      this.etherValueRequestedError = true;
    }
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'requestCoinFinished') {
    } else if (callbackData === 'requestCoinFailed') {
    }
  }

}
