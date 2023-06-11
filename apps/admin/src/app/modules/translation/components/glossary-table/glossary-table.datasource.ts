
import {AfterViewInit} from "@angular/core";
import {FirebaseDataSource} from "@satipasala/base";
import {TranslateText} from "../../service/translate-text.TranslateText";
import {GlossaryService} from "../../service/glossary.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export class GlossaryTableDatasource extends FirebaseDataSource<TranslateText> implements AfterViewInit {
  paginator: MatPaginator;
  sort: MatSort;
  glossaryService: GlossaryService;

  constructor(paginator: MatPaginator, sort: MatSort,
              glossaryService: GlossaryService, public locale: string) {
    super(paginator, sort, glossaryService);
    this.paginator = paginator;
    this.sort = sort;
    this.glossaryService = glossaryService;
  }

  loadMore(event: PageEvent) {
    this.queryData(query => query.orderBy("uid").startAt(event.pageIndex).limit(event.pageSize), {
      documentId: this.locale,
      subCollection: 'translations'
    });
  }


  fetchData(): void {
    this.queryData((query => query.orderBy("uid").startAt(0).limit(10)), {
      documentId: this.locale,
      subCollection: 'translations'
    });
  }

}
