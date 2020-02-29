import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadeComponent } from './fade.component';

@NgModule({
  declarations: [FadeComponent],
  imports: [
    CommonModule
  ],
  exports: [FadeComponent]
})
export class FadeModule { }
