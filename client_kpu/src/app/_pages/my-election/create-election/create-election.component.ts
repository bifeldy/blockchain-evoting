import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/_shared/services/global.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { ConfirmModalComponent } from 'src/app/_shared/components/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { ElectionService } from 'src/app/_shared/services/election.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.css']
})
export class CreateElectionComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;

  fg: FormGroup;

  users = null;

  submitted = false;
  alreadySubmitted = false;
  showPassword = false;

  usingFileUpload = false;
  selectedImageFileName = 'Pilih File / Gunakan URL';
  errorImageTooBig = null;

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private as: AuthService,
    private router: Router,
    private es: ElectionService,
    private us: UserService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.initializeUsers();
  }

  initializeForm(data = null) {
    this.fg = this.fb.group({
      electionName: [data ? data.electionName : null, Validators.compose([Validators.required])],
      electionDescription: [data ? data.electionDescription : null, Validators.compose([Validators.required])],
      electionImage: [data ? data.electionImage : 'http://via.placeholder.com/144x81', Validators.compose([Validators.required])],
      electionCandidate: [data ? data.electionCandidate : null, Validators.compose([Validators.required])],
      passphrase: [data ? data.passphrase : null, Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      reTypePassphrase: [data ? data.reTypePassphrase : null, Validators.compose([Validators.required])],
    }, {
      validator: this.customValidator
    });
  }

  customValidator(control: AbstractControl) {
    const passphrase: string = control.get('passphrase').value;
    const reTypePassphrase: string = control.get('reTypePassphrase').value;
    if (passphrase != null && passphrase !== undefined && passphrase !== '' && passphrase.length < 8) {
      control.get('passphrase').setErrors({ noPasswordMin: true });
    }
    if (reTypePassphrase != null && reTypePassphrase !== undefined && reTypePassphrase !== '' && passphrase !== reTypePassphrase) {
      control.get('reTypePassphrase').setErrors({ noPasswordMatch: true });
    }
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  initializeUsers() {
    this.us.getAllUser().subscribe(
      res => {
        this.gs.log('[ElectionUserCandidateList]', res);
        this.users = res.results.filter(r => r.pubKey !== this.as.currentUserValue.pubKey && r.role === 'voter');
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.alreadySubmitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      return;
    }
    const eCObj = this.fg.value.electionCandidate;
    const eCPubKey = [];
    eCObj.forEach(eC => { eCPubKey.push(eC.pubKey); });
    this.fg.controls.electionCandidate.patchValue(eCPubKey);
    this.fg.controls.passphrase.patchValue(window.btoa(this.fg.value.passphrase));
    this.fg.controls.reTypePassphrase.patchValue(window.btoa(this.fg.value.reTypePassphrase));
    this.gs.log('[COMPONENT_CREATE-ELECTION]', this.fg.value);
    this.es.createNewElection(this.fg.value).subscribe(
      res => {
        this.gs.log('[ElectionCreate]', res);
        this.confirmModal.showModal({
          callbackData: 'createElectionFinished',
          title: `Receipt '${this.fg.value.electionName}'`,
          body: JSON.stringify(res.result.trxCreateElectionWithCandidates),
          submit: 'OK'
        }, true);
      },
      err => {
        this.fg.controls.electionCandidate.patchValue(null);
        this.fg.controls.passphrase.patchValue(null);
        this.fg.controls.reTypePassphrase.patchValue(null);
        this.submitted = false;
        this.confirmModal.showModal({
          callbackData: 'createElectionFailed',
          title: `Receipt '${this.fg.value.electionName}'`,
          body: JSON.stringify(err.error.result.message),
          submit: 'OK'
        });
      }
    );
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'createElectionFinished') {
      this.router.navigateByUrl('/election');
    } else if (callbackData === 'createElectionFailed') {
    }
  }

  uploadImage(event) {
    this.fg.controls.electionImage.patchValue(null);
    this.usingFileUpload = true;
    const file = event.target.files[0];
    this.selectedImageFileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      if (file.size < 24000) {
        const img = document.createElement('img');
        img.onload = () => {
          this.fg.controls.electionImage.patchValue(reader.result.toString());
        };
        img.src = reader.result.toString();
        this.errorImageTooBig = null;
      } else {
        this.errorImageTooBig = 'Ukuran Upload File Melebihi Batas 24 KB!';
      }
    };
  }

  imageChange() {
    this.errorImageTooBig = null;
    if (this.fg.get('electionImage').value.startsWith('data:')) {
      this.fg.controls.electionImage.patchValue(null);
    }
  }

  deleteImage() {
    this.usingFileUpload = false;
    this.selectedImageFileName = 'Pilih File / Gunakan URL';
    this.errorImageTooBig = null;
    this.fg.controls.electionImage.patchValue(null);
  }

}
