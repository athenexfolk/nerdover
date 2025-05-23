import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemButtonComponent } from './content-item-button.component';

describe('ContentItemButtonComponent', () => {
  let component: ContentItemButtonComponent;
  let fixture: ComponentFixture<ContentItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentItemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
