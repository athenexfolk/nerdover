import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCardComponent } from './overlay-card.component';

describe('OverlayCardComponent', () => {
  let component: OverlayCardComponent;
  let fixture: ComponentFixture<OverlayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
