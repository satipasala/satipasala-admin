import {Injectable} from "@angular/core";
import {City, CollectionService, Country, EventsInfo, State, ReferenceDataService, RefDataType} from "@satipasala/base";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Event} from "@satipasala/base";
import {Observable, ReplaySubject, Subscription} from "rxjs";
import {HostInfo} from "../../../../../../../libs/base/src/lib/model/Host";
import {StateInfo} from "../../../../../../../libs/base/src/lib/model/referencedata/State";
import {CityInfo} from "../../../../../../../libs/base/src/lib/model/referencedata/City";
import {distinct, map, mergeMap, toArray, filter} from "rxjs/operators";

@Injectable()
export class EventsDashboardService extends CollectionService<any> {
  public static collection: string = "stats";
  private _eventsObjObservable: ReplaySubject<Event[]> = new ReplaySubject<Event[]>(0);
  private cities = {};

  constructor(protected fireStore: AngularFirestore, private referenceDataServie: ReferenceDataService) {
    super(EventsDashboardService.collection, fireStore);
    this.referenceDataServie.getData<City>(RefDataType.CITY, true).subscribe((cityArr: City[]) => {
      cityArr.forEach(city => this.cities[city.id] = city);
      this.get('EVENTS').subscribe(_eventsObj => {
        this._eventsObjObservable.next(Object.values<any>(_eventsObj).filter(value => value != 'EVENTS').map(e => this.mapAddressInfo(e)))
      })
    });
  }



  public getEventsInfo(predicate: (event: Event) => boolean): Observable<EventsInfo> {

    return new Observable<EventsInfo>(subscriber => {
      let eventsInfo: EventsInfo = this._getEmptyEventInfo();
      const subscription: Subscription = this._eventsObjObservable.subscribe(events => {
        events.filter(predicate).forEach((event: Event) => {
          eventsInfo = this._plusData(eventsInfo, event);
        });
        subscriber.next(eventsInfo);
        subscriber.complete();
        // getSubscription().unsubscribe();
      }, error => {
        subscriber.next(eventsInfo);
        subscriber.complete();
        getSubscription().unsubscribe();
      }, () => {
        getSubscription().unsubscribe();
      });

      function getSubscription() {
        return subscription;
      }

    })
  }

  public getEvents(predicate: (event: Event) => boolean): Observable<Event[]> {

    return new Observable<Event[]>(subscriber => {
       this._eventsObjObservable.subscribe(events => {
        subscriber.next(events.filter(predicate))
        subscriber.complete();
      }, error => {
        subscriber.next([]);
        subscriber.complete();
      } );


    })
  }

  mapAddressInfo(event: Event) {
    event.addressInfo.city = this.cities[event.addressInfo.city.id];
    return event;
  }

  getOrganizations(predicate: (event: Event) => boolean): Observable<HostInfo[]> {
    return this.getWorldEvents().pipe(
      mergeMap(event => event),
      filter(predicate),
      distinct((e: Event) => e.host.id),
      map(event => event.host),
      toArray()
    );
  }

  getOrganizationsOfWord(): Promise<HostInfo[]> {
    return this.getOrganizations(() => true).toPromise();
  }
  getOrganizationsOfCountry(country:Country): Promise<HostInfo[]> {
    return this.getOrganizations(event => event.addressInfo.city.state.country.shortName === country.shortName).toPromise();
  }

  getOrganizationsOfState(state: State): Promise<HostInfo[]> {
    return this.getOrganizations(event => event.addressInfo.city.state.id === state.id).toPromise();
  }

  getOrganizationsOfCity(city: City): Promise<HostInfo[]> {
    return this.getOrganizations(event => event.addressInfo.city.id === city.id).toPromise();
  }


  public getWorldEventsInfo(): Observable<EventsInfo> {
    return this.getEventsInfo(() => true)
  }

  getWorldEvents(): Observable<Array<Event>> {
    return this.getEvents(() => true)
  }

  public getCountryEventsInfo(country: Country): Observable<EventsInfo> {
    return this.getEventsInfo((event: Event) => event.addressInfo.city.state.country.shortName === country.shortName);
  }

  getCountryEvents(country: Country): Observable<Array<Event>> {
    return this.getEvents((event: Event) => event.addressInfo.city.state.country.shortName === country.shortName)
  }

  public getStateEventsInfo(state: State): Observable<EventsInfo> {
    return this.getEventsInfo((event: Event) => event.addressInfo.city.state.id === state.id);
  }

  getStateEvents(state: State): Observable<Array<Event>> {
    return this.getEvents((event: Event) => event.addressInfo.city.state.id === state.id);
  }

  getCountriesOfWorld(): Observable<Country[]> {
    return this.getWorldEvents().pipe(
      mergeMap(event => event),
      distinct((e: Event) => e.addressInfo.city.state.country.shortName),
      map(event => event.addressInfo.city.state.country),
      toArray()
    );
  }


  getStatesOfCountry(country: Country): Promise<State[]> {
    return this.getCountryEvents(country).pipe(
      mergeMap(event => event),
      distinct((e: Event) => e.addressInfo.city.state.id),
      map(event => event.addressInfo.city.state),
      toArray()
    ).toPromise();
  }


  getCitiesOfState(state: State): Observable<City[]> {
    return this.getStateEvents(state).pipe(
      mergeMap(event => event),
      distinct((e: Event) => e.addressInfo.city.id),
      map(event => event.addressInfo.city),
      toArray()
    );
  }


  public getCityEventsInfo(city: City): Observable<EventsInfo> {
    return this.getEventsInfo((event: Event) => event.addressInfo.city.id === city.id);
  }

  getCityEvents(city: CityInfo): Observable<Array<Event>> {
    return this.getEvents((event: Event) => event.addressInfo.city.id === city.id);
  }

  public getOrganizationEventsInfo(organization: HostInfo): Observable<EventsInfo> {
    return this.getEventsInfo((event: Event) => event.host.id === organization.id);
  }

  getOrganizationEvents(organization: HostInfo): Observable<Array<Event>> {
    return this.getEvents((event: Event) => event.host.id === organization.id);
  }

  _getEmptyEventInfo(): EventsInfo {
    return <EventsInfo>{
      numberOfAdults: 0,
      numberOfChildren: 0,
      numberOfFemales: 0,
      numberOfMales: 0,
      numberOfParticipants: 0,
      numberOfEvents: 0
    }
  }

  _plusData(eventsInfo: EventsInfo, event: Event): EventsInfo {
    eventsInfo.numberOfFemales += event.participants.numberOfFemales
    eventsInfo.numberOfMales += event.participants.numberOfMales
    eventsInfo.numberOfChildren += event.participants.numberOfChildren
    eventsInfo.numberOfAdults += event.participants.numberOfAdults
    eventsInfo.numberOfParticipants += event.participants.numberOfParticipants
    eventsInfo.numberOfEvents += 1;
    return eventsInfo;
  }
}

/*
export class EventsDashboard {

}
*/
