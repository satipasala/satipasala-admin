import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadingIndicatorService {
  observable: BehaviorSubject<boolean>;

  public getSubject(): Subject<boolean> {
    if (this.observable) {
      return this.observable;
    }
    this.observable = new BehaviorSubject(false);
    return this.observable;
  }

  public start() {
    this.observable.next(true);
  }

  public stop() {
    this.observable.next(false);
  }

  public value(): boolean {
    return this.observable.getValue();
  }

}
