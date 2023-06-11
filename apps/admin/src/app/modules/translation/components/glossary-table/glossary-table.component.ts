import {AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {TranslateText} from "../../service/translate-text.TranslateText";
import {FirebaseDataSource} from "@satipasala/base";
import {GlossaryService} from "../../service/glossary.service";
import {GlossaryTableDatasource} from "./glossary-table.datasource";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'admin-glossary-table',
  templateUrl: './glossary-table.component.html',
  styleUrls: ['./glossary-table.component.css']
})
export class GlossaryTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: FirebaseDataSource<TranslateText>;

  displayedColumns = ['id', 'uid', 'lang', 'model', 'translated', 'phrase', 'edit'];
  pageEvent: PageEvent;

  constructor(private glossaryService: GlossaryService, @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    this.dataSource = new GlossaryTableDatasource(this.paginator, this.sort, this.glossaryService, this.locale);
  }

  ngAfterViewInit(): void {
    this.dataSource.ngAfterViewInit();
  }

  loadMore(event: PageEvent) {
    this.dataSource.loadMore(event);
  }

  /**
   * Update table on language change
   *
   * @param {string} currentLanguage
   * @param {string} previousLanguage
   */
  onLanguageChange(currentLanguage: string, previousLanguage: string) {
    this.dataSource = new GlossaryTableDatasource(this.paginator, this.sort, this.glossaryService, this.locale);
    this.dataSource.fetchData();
  }
}
