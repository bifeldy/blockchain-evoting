import {
  Component,
  OnInit,
  ViewChild,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @ViewChild('autoShownModal', { static: false })
  autoShownModal: ModalDirective;

  @Output() submitButton = new EventEmitter();

  modalData = null;

  isModalOpen = false;

  needTextBox = false;

  constructor() { }

  ngOnInit() { }

  showModal(data, usingTextBox = false) {
    this.modalData = data;
    this.needTextBox = usingTextBox;
    this.isModalOpen = true;
  }

  hideModal() {
    this.autoShownModal.hide();
  }

  onHidden() {
    this.isModalOpen = false;
  }

  onSubmit() {
    this.submitButton.emit(this.modalData.callbackData);
    this.hideModal();
  }
}
