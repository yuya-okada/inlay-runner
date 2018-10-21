import { TestBed, inject } from '@angular/core/testing';

import { SceneManagerService } from './scene-manager.service';
import { ComponentsDataService } from '../components-data.service';
import { HttpModule } from '@angular/http';
import { InlayTestModule } from '../inlay-test/inlay-test.module';
import { InlayRunTestModule } from '../inlay-run-test/inlay-run-test.module';

describe('ScenenManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InlayTestModule, InlayRunTestModule
      ]
    });
  });

  it('should be created', inject([SceneManagerService], (service: SceneManagerService) => {
    expect(service).toBeTruthy();
  }));
});
