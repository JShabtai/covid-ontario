import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineRegistrationComponent } from './vaccine-registration.component';

describe('VaccineRegistrationComponent', () => {
  let component: VaccineRegistrationComponent;
  let fixture: ComponentFixture<VaccineRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
