import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalElectionVoteComponent } from './modal-election-vote.component';

describe('ModalElectionVoteComponent', () => {
  let component: ModalElectionVoteComponent;
  let fixture: ComponentFixture<ModalElectionVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalElectionVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalElectionVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
