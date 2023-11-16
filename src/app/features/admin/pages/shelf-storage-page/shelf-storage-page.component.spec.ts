import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfStoragePageComponent } from './shelf-storage-page.component';

describe('ShelfStoragePageComponent', () => {
  let component: ShelfStoragePageComponent;
  let fixture: ComponentFixture<ShelfStoragePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelfStoragePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShelfStoragePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
