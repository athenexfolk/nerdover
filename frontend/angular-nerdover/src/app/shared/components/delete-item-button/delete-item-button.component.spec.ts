import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemButtonComponent } from './delete-item-button.component';

describe('DeleteItemButtonComponent', () => {
  let component: DeleteItemButtonComponent;
  let fixture: ComponentFixture<DeleteItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteItemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
