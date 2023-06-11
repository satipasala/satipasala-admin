import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SearchFilter} from "../model/SearchFilter";

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService {

  private searchSource: Subject<string>;

  constructor() {
    console.info("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.info("||||||||||||||||||||||||||||||||||||search service created||||||||||||||||||||||||||||||||");
    console.info("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    this.searchSource = new Subject<string>();
  }

  public setSearchTerm(searchTerm: string): void {
    this.searchSource.next(searchTerm);
  }


  /*  public connect(next?: (value: any) => void, error?: (error: any) => void, complete?: () => void):Subscription{
      return this.searchSource.pipe(debounceTime(500),distinctUntilChanged()).subscribe(next,error,complete);
    }*/

  public connect(searchFields: string[], next?: (value: SearchFilter[]) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.searchSource.pipe(debounceTime(500), distinctUntilChanged(), map(searchTerm => this.createSearchFilters(searchFields, searchTerm)
    )).subscribe(next, error, complete);
  }

  //todo this function generate mutiple search filters which are converted to separate search queries in infinite scroll grid.need to optimize the search
  createSearchFilters(searchFields: string[], searchTerm: string): SearchFilter[] {
    let filters: SearchFilter[] = [];
    if (searchTerm != null && searchTerm.trim().length > 0) {
      searchFields.forEach(field => {
        let upperCaseValue = searchTerm.toUpperCase();
        let lowerCaseValue = searchTerm.toLowerCase();
        let calmelCaseValue = this.camelCase(searchTerm);

        filters.push({field: field, value: searchTerm});
        if (upperCaseValue != searchTerm) {
          filters.push({field: field, value: upperCaseValue})
        }
        if (lowerCaseValue != searchTerm) {
          filters.push({field: field, value: lowerCaseValue});
        }

        if (calmelCaseValue != searchTerm) {
          filters.push({field: field, value: calmelCaseValue});
        }

      });
    }

    return filters;
  }

  camelCase(str) {
    return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => " "+chr.toUpperCase()).trim();
  }

}
