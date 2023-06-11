import {inject, TestBed} from '@angular/core/testing';

import { RolesService } from './roles.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "../../../../testing/src/lib/firebase/MockedFireBase";
import 'core-js/es7/reflect';
describe('RolessService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[{provide: AngularFirestore, useValue: MockFireStore},
      { provide: RolesService, useValue: new RolesService(null) }]
  }));

  test.todo('some test to be written in the future');
});
