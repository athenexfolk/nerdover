import { TestBed } from '@angular/core/testing';

import { ShelfRepositoryService } from './shelf-repository.service';

describe('ShelfRepositoryService', () => {
  let service: ShelfRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelfRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
