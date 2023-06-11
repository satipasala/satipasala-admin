import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "@satipasala/testing";
describe('CoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers:[
    {provide: AngularFirestore, useValue: MockFireStore},
      { provide: CoursesService, useValue: new CoursesService(null) }]}));

  it('should be created', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service).toBeTruthy();
  });
});
