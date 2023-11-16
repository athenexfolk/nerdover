import { TestBed } from '@angular/core/testing';

import { ImageRepositoryService } from './image-repository.service';

describe('ImageRepositoryService', () => {
  let service: ImageRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
