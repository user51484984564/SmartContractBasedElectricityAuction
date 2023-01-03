import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDialogueComponent } from './popup-dialogue.component';

describe('PopupDialogueComponent', () => {
  let component: PopupDialogueComponent;
  let fixture: ComponentFixture<PopupDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
