import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeadsOverviewPageComponent } from './leads.component';

describe('LeadsOverviewPageComponent', () => {
  let component: LeadsOverviewPageComponent;
  let fixture: ComponentFixture<LeadsOverviewPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsOverviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
