import { TestBed, inject } from '@angular/core/testing';

import { ComponentsDataService } from './components-data.service';
import { HttpModule, Http } from '@angular/http';
import { AppModule } from './app.module';

describe('ComponentsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComponentsDataService
      ],
      imports: []
    });
  });

  let serviceInstance:ComponentsDataService = null
  it('should be created', inject([ComponentsDataService], (service: ComponentsDataService) => {
    expect(service).toBeTruthy();
    if (service) {
      serviceInstance = service
    }
  }));

  it("コンポーネントのデータ取得", () => {
    serviceInstance.get().subscribe((data) => {
      expect(data).toBeTruthy();
    })
  })
});
