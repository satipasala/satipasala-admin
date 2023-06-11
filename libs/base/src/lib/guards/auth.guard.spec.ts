import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


xdescribe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireAuthModule
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { afAuth: { } } },
        { provide: NotifyService, useValue: { } }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
  }));
});
