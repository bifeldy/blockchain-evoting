import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import sha512 from 'crypto-js/sha512';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
  }

  SHA512(stringToHash) {
    return sha512(stringToHash).toString();
  }

  Log(logData) {
    if (!environment.production) {
      console.log(logData);
    }
  }

  ShuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue = null;
    let randomIndex = null;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
