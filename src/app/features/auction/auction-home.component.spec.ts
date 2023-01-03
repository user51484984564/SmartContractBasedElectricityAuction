import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionHomeComponent } from './auction-home.component';

describe('AuctionHomeComponent', () => {
  let component: AuctionHomeComponent;
  let fixture: ComponentFixture<AuctionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
