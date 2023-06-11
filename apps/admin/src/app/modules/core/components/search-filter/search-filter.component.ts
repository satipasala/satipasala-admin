import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import {FormControl} from "@angular/forms";
import {GlobalSearchService} from "@satipasala/base";

@Component({
  selector: 'admin-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})


export class SearchFilterComponent implements OnInit {

  searchTerm = new FormControl('');

  constructor(protected router: Router,  private globalSearchService : GlobalSearchService) {
   /* this.router.events.subscribe(event => {
      this.setSearchFilter(event);
    });*/
/*
    this.searchFilterService.currentResult.subscribe(result => this.tempSearchResult = result)*/
  }

  ngOnInit() {
    this.searchTerm.valueChanges.subscribe(value => {
      this.globalSearchService.setSearchTerm(value.trim())
    });
  }

  clearSearch(){
    this.searchTerm.setValue('')
  }

}
