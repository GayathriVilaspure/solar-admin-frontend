import { TestBed } from '@angular/core/testing';
import { VisitQueryService } from './visit-query.service';

describe('VisitQueryService', () => {
  let service: VisitQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});