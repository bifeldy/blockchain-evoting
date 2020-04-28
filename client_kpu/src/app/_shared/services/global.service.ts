import { Injectable, isDevMode } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {}

  log(
    message: string,
    data: any = null,
    type: string = 'log'
  ) {
    if (isDevMode()) {
      if (type === 'log') {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'error') {
        console.error(message, data);
      }
    }
  }

  getDirtyValues(formGroup: FormGroup) {
    const dirtyValues = {};
    Object.keys(formGroup.controls).forEach(control => {
      const currentControl = formGroup.get(control);
      if (currentControl.dirty) {
        dirtyValues[control] = currentControl.value;
      }
    });
    return dirtyValues;
  }

  get randomColor() {
    return (Math.random() * 0xFFFFFF << 0).toString(16);
  }
}
