import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStoragePageComponent } from './image-storage-page.component';

describe('ImageStoragePageComponent', () => {
  let component: ImageStoragePageComponent;
  let fixture: ComponentFixture<ImageStoragePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageStoragePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageStoragePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
