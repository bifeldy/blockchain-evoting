import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyElectionComponent } from './my-election.component';

describe('MyElectionComponent', () => {
  let component: MyElectionComponent;
  let fixture: ComponentFixture<MyElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
