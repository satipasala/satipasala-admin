import {inject, TestBed} from '@angular/core/testing';
import { ReferenceDataService } from './reference-data.service';
import 'core-js/es7/reflect';
/*describe('ReferenceDataService', () => {

  beforeEach(async () => TestBed.configureTestingModule({
    providers:[ReferenceDataService]
  }).compileComponents());


  it('should be created', () => {
    const service: ReferenceDataService = TestBed.get(ReferenceDataService);
    expect(service).toBeTruthy();
  });
/!*
  test.todo('some test to be written in the future');*!/
});*/

describe('ReferenceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferenceDataService]
    });
  });

/*  it('should be created', inject([ReferenceDataService], (service: ReferenceDataService) => {
    expect(service).toBeTruthy();
  }));*/
  test.todo('some test to be written in the future');
});
