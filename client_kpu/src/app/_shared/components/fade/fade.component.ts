import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type FadeState = 'visible' | 'hidden';

@Component({
  selector: 'app-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.css'],
  animations: [
    trigger('state', [
      state(
        'visible',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden',
        style({
          opacity: '0'
        })
      ),
      transition('* => visible', [animate('500ms ease-out')]),
      transition('visible => hidden', [animate('500ms ease-out')])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FadeComponent {
  state: FadeState;
  // tslint:disable-next-line: variable-name
  private _show: boolean;
  get show() {
    return this._show;
  }
  @Input()
  set show(value: boolean) {
    if (value) {
      this._show = value;
      this.state = 'visible';
    } else {
      this.state = 'hidden';
    }
  }

  animationDone(event: AnimationEvent) {
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      this._show = false;
    }
  }
}
