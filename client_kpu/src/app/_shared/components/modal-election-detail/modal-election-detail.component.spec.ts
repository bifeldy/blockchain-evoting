import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalElectionDetailComponent } from './modal-election-detail.component';

describe('ModalElectionDetailComponent', () => {
  let component: ModalElectionDetailComponent;
  let fixture: ComponentFixture<ModalElectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalElectionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalElectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
