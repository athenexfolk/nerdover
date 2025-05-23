import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemButtonComponent } from './edit-item-button.component';

describe('EditItemButtonComponent', () => {
  let component: EditItemButtonComponent;
  let fixture: ComponentFixture<EditItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditItemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
