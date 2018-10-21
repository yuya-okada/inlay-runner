import { TestBed, inject } from '@angular/core/testing';

import { DirectivesDataService } from './directives-data.service';
import { InlayTestModule } from './inlay-test/inlay-test.module';

describe('DirectivesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectivesDataService],
      imports: [InlayTestModule]
    });
  });

  it('should be created', inject([DirectivesDataService], (service: DirectivesDataService) => {
    expect(service).toBeTruthy();
  }));
});
