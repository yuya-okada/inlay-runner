import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlayButtonComponent } from './inlay-button.component';

describe('InlayButtonComponent', () => {
  let component: InlayButtonComponent;
  let fixture: ComponentFixture<InlayButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlayButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
