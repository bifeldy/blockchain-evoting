import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  constructor(
    private api: ApiService
  ) {
  }

  getLatestBlock(page, row) {
    return this.api.getData(`/block?page=${page}&row=${row}`);
  }

  getDetailBlock(blockNumberOrHash) {
    return this.api.getData(`/block/${blockNumberOrHash}`);
  }

  getDetailTransaction(transactionHash) {
    return this.api.getData(`/transaction/${transactionHash}`);
  }

  getSigners() {
    return this.api.getData(`/signer`);
  }

  getBlockSigner(blockHash) {
    return this.api.getData(`/signer/${blockHash}`);
  }
}
