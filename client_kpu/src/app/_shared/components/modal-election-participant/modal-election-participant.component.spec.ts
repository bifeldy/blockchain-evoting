import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalElectionParticipantComponent } from './modal-election-participant.component';

describe('ModalElectionParticipantComponent', () => {
  let component: ModalElectionParticipantComponent;
  let fixture: ComponentFixture<ModalElectionParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalElectionParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalElectionParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
