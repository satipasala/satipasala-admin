import {Component, OnInit} from '@angular/core';
import {
  LoadingIndicatorService,
  NotificationService,
  Questionnaire,
  QuestionnaireService,
  SidenavService
} from "@satipasala/base";
import {ActivatedRoute} from "@angular/router";
import {OrderBy} from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'admin-questionnaire-edit-page',
  templateUrl: './questionnaire-edit-page.component.html',
  styleUrls: ['./questionnaire-edit-page.component.scss']
})
export class QuestionnaireEditPage implements OnInit {
  static editMode: "edit" = "edit";
  static addMode: "add" = "add";
  orderBy: OrderBy[];
  currentQuestionnaire: Questionnaire;
  questionForm: FormGroup;
  mode: "edit" | "add";

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              protected questionnaireService: QuestionnaireService, private sideNavService: SidenavService,
              private notificationService: NotificationService) {

    this.orderBy = [{fieldPath: 'label', directionStr: 'asc'}];

    // Subscribe to router to get role id
    activatedRoute.params.subscribe(params => {
      if (params.questionnaireId) {
        const questionnaireId = params.questionnaireId;
        this.questionnaireService.get(questionnaireId).subscribe(questionnaireDoc => {
          this.currentQuestionnaire = questionnaireDoc;
          this.onQuestionnaireFetch(this.currentQuestionnaire);
        },reason => this.notificationService.showErrorNotification(reason))
      } else {
        this.onQuestionnaireFetch(null);
      }
    });
  }

  onQuestionnaireFetch(questionnaire: Questionnaire) {
    if (questionnaire == null) {
      this.mode = QuestionnaireEditPage.addMode;
      this.currentQuestionnaire = <Questionnaire>{
        name: null,
        questions: {}
      }
    } else {
      this.mode = QuestionnaireEditPage.editMode;
      this.updateFormValues();
    }
  }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      questionnaireName:  ['', [Validators.required]] ,
      items: new FormArray([])
    });
  }

  onSubmit(value: any) {
    this.currentQuestionnaire.questions = {};
    value.items.forEach((item) => {
      if (item.isAdded) {
        this.currentQuestionnaire.questions[item.question.id] = item.question;
      }
    });

    this.saveQuestionnaire();
  }

  updateFormValues() {
    this.questionForm.patchValue({
      questionnaireName: this.currentQuestionnaire.name,
      items: Object.values(this.currentQuestionnaire.questions)
    })
  }

  addQuestionnaire() {
    this.notificationService.startLoadingIndicator('Adding Questionnaire...')
    this.currentQuestionnaire.id = this.currentQuestionnaire.name;
    this.questionnaireService.addWithId(this.currentQuestionnaire).then(() => {
      this.notificationService.showSuccessNotification("Questionnaire added successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to add questionnaire", err);
    })
  }

  updateQuestionnaire() {
    this.notificationService.startLoadingIndicator()
    this.questionnaireService.update(this.currentQuestionnaire.id, this.currentQuestionnaire).then(() => {
      this.notificationService.showSuccessNotification("Questionnaire updated successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to update questionnaire", err);
    })
  }

  saveQuestionnaire() {
    switch (this.mode) {
      case QuestionnaireEditPage.addMode:
        this.addQuestionnaire();
        break;
      case QuestionnaireEditPage.editMode:
        this.updateQuestionnaire();
        break;
    }
  }

  back() {
    this.sideNavService.close();
  }

}
