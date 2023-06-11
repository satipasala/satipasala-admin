import { TestBed, waitForAsync } from '@angular/core/testing';
import { GoogleChartsModule } from './google-charts.module';

describe('GoogleChartsModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoogleChartsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GoogleChartsModule).toBeDefined();
  });
});
