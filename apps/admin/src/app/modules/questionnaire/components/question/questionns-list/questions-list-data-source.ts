import {FirebaseDataSource, Question} from "@satipasala/base";
import {QuestionsService} from "@satipasala/base";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

export class QuestionsListDataSource extends FirebaseDataSource<Question<any>>{

  constructor(public paginator: MatPaginator, private sort: MatSort,
              public questionnaireService: QuestionsService) {
    super(paginator, sort, questionnaireService);
    this.setOrderBy({fieldPath:"label"})
  }

}
