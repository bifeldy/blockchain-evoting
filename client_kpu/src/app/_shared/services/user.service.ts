import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  myCoinBase = {
    wei: 0,
    gwei: 0,
    ether: 0,
    tether: 0
  };

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
  }

  getAccountBalance(accountAddress) {
    this.api.getData(`/coinbase?accountAddress=${accountAddress}`).subscribe(
      res => {
        this.gs.log('[COINBASE]', res);
        this.myCoinBase = res.result;
      }
    );
  }

  requestCoin(coinRequestedValue) {
    return this.api.postData('/fund', coinRequestedValue);
  }

  adminAcceptCoinRequest(id) {
    return this.api.postData(`/fund/${id}`);
  }

  getAllUser() {
    return this.api.getData('/user');
  }

  getUserData(userAddress) {
    return this.api.getData(`/user/${userAddress}`);
  }

  cekNik(data) {
    return this.api.postData('/kpu/cek-nik', data);
  }

  cekAccount(data) {
    return this.api.postData('/check-account', data);
  }

  registerAccount(data) {
    return this.api.postData('/register', data);
  }

  newEthAccount(data) {
    return this.api.postData('/new-eth-account', data);
  }

  importEthAccount(data) {
    return this.api.postData('/import-eth-account', data);
  }

  getTransactionHash(transactionHash) {
    return this.api.getData(`/dump/${transactionHash}`);
  }
}
