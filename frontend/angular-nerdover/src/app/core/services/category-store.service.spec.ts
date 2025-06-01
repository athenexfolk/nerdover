import { TestBed } from '@angular/core/testing';

import { CategoryStoreService } from './category-store.service';

describe('CategoryStoreService', () => {
  let service: CategoryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
