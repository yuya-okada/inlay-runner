import { TestBed, inject } from '@angular/core/testing';

import { ScriptManagerService } from './script-manager.service';

describe('ScriptManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptManagerService]
    });
  });

  it('should be created', inject([ScriptManagerService], (service: ScriptManagerService) => {
    expect(service).toBeTruthy();
  }));
});
