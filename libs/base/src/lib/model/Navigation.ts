import {NavigationItem} from "./NavigationItem";

export class Navigation {
  categoryName: string;
  icon: string;
  dropDown: boolean;
  subCategory: NavigationItem[];
  categoryLink: string;
  isActive: boolean;

  constructor(_categoryName: string, _icon: string, _dropDown: boolean, categoryLink: string = "", _subCategory: NavigationItem[]) {
    this.categoryName = _categoryName;
    this.icon = _icon;
    this.dropDown = _dropDown;
    this.subCategory = _subCategory;
    this.categoryLink = categoryLink;
    this.isActive = false;
  }
}

