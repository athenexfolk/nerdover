import { TestBed } from '@angular/core/testing';

import { LessonStoreService } from './lesson-store.service';

describe('LessonStoreService', () => {
  let service: LessonStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
