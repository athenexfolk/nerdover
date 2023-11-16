import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePanelComponent } from './confirm-delete-panel.component';

describe('ConfirmDeletePanelComponent', () => {
  let component: ConfirmDeletePanelComponent;
  let fixture: ComponentFixture<ConfirmDeletePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeletePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeletePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
