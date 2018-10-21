import { TestBed, inject } from '@angular/core/testing';

import { ProjectManagerService } from './project-manager.service';
import { ComponentsDataService } from '../components-data.service';
import { InlayTestModule } from '../inlay-test/inlay-test.module';
import { InlayRunTestModule } from '../inlay-run-test/inlay-run-test.module';

describe('ProjectManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InlayTestModule, InlayRunTestModule]
    });
  });

  it('should be created', inject([ProjectManagerService], (service: ProjectManagerService) => {
    expect(service).toBeTruthy();
  }));
});
