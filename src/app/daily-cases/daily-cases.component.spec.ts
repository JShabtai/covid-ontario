import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCasesComponent } from './daily-cases.component';

describe('DailyCasesComponent', () => {
  let component: DailyCasesComponent;
  let fixture: ComponentFixture<DailyCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
