import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Navigation} from "../model/Navigation"
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  observable: Subject<any>;
  navList: Navigation[];

  public getSubject(): Subject<any> {
    if (this.observable) {
      return this.observable;
    }
    this.observable = new Subject();
    return this.observable;
  }

  /**
   * Navigate to the given category name
   *
   * @param {string} categoryName
   */
  public navigate(categoryName: string) {
    for (const navigation of this.navList) {
      if (navigation.categoryName === categoryName) {
        this.observable.next(navigation);
        return;
      }
    }
  }

  /**
   * Navigate to the given category name
   *
   * @param {string} categoryName
   */
  public navigateToSubCategory(categoryLink: string, subCategoryLink: string) {
    for (const navigation of this.navList) {
      if (navigation.categoryLink === categoryLink) {
        navigation.subCategory.forEach((navigationItem) => {
          if (navigationItem.subCategoryLink == subCategoryLink) {
            this.observable.next(navigation);
          }
        });
      }
    }
  }

  public setNavList(navList: Navigation[]) {
    this.navList = navList;
  }



}


