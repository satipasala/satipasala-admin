import {inject, TestBed} from '@angular/core/testing';

import { HostsService } from './hosts.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "../../../../testing/src/lib/firebase/MockedFireBase";
import 'core-js/es7/reflect';
describe('HostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[{provide: AngularFirestore, useValue: MockFireStore},
      { provide: HostsService, useValue: new HostsService(null) }]
  }));

 /* it('should be created', () => {
    const service: HostsService = TestBed.get(HostsService);
    expect(service).toBeTruthy();
  });*/

  test.todo('some test to be written in the future');
});
