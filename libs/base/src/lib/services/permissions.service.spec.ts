import {inject, TestBed} from '@angular/core/testing';

import { PermissionsService } from './permissions.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "../../../../testing/src/lib/firebase/MockedFireBase";
import 'core-js/es7/reflect';
describe('PermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[{provide: AngularFirestore, useValue: MockFireStore},
      { provide: PermissionsService, useValue: new PermissionsService(null) }]
  }));

  test.todo('some test to be written in the future');
});
