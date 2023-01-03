import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellLimitsComponent } from './sell-limits.component';

describe('SellLimitsComponent', () => {
  let component: SellLimitsComponent;
  let fixture: ComponentFixture<SellLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellLimitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
