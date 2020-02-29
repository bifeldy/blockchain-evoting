import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeComponent } from './fade.component';

describe('FadeComponent', () => {
  let component: FadeComponent;
  let fixture: ComponentFixture<FadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
