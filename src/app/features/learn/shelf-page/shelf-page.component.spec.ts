import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfPageComponent } from './shelf-page.component';

describe('ShelfPageComponent', () => {
  let component: ShelfPageComponent;
  let fixture: ComponentFixture<ShelfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelfPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShelfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
