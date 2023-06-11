import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {
  QuestionLabel,
  QuestionsService,
  QuestionType,
  RefDataType,
  ReferenceDataService,
  SidenavService,
  NotificationService, Question, QuestionLevel, ScoringMechanism,
} from "@satipasala/base";

import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-question-creation-page',
  templateUrl: './question-creation-page.component.html',
  styleUrls: ['./question-creation-page.component.scss']
})
export class QuestionCreationPageComponent implements OnInit {
  static editMode: "edit" = "edit";
  static addMode: "add" = "add";
  mode: "edit" | "add"|'view';

  question: Question<any>;
  originalQuestion: Question<any>;

  questionsTypes: QuestionType[];
  questionLevels: QuestionLevel[];
  scoringMechanisms: ScoringMechanism[];
  questionLabels: QuestionLabel[];


  questionId?: string;

  get questionLevelName(): string {
    //return this.question.questionLevel.name;
    if(this.questionForm.get("questionLevel").value != null){
      return this.questionForm.get("questionLevel").value.name
    }else{
      return null;
    }

  }

  set questionLevelName(name: string) {
   // this.questionForm.get("questionLevel").value.name = name;
    //this.questionForm.patchValue({ questionLevel: name });
    //this.question.questionLevel = this.questionLevels.filter(level => level.name === name)[0]
    this.questionForm.get("questionLevel").setValue(this.questionLevels.filter(level => level.name === name)[0])
  }

  get scoringMechanismType(): string {
    if (this.questionForm.get("scoringMechanism").value != null) {
      return this.questionForm.get("scoringMechanism").value.type;
    } else {
      return null;
    }
  }

  set scoringMechanismType(type: string) {
    this.questionForm.get("scoringMechanism").setValue(this.scoringMechanisms.filter(mechanism => mechanism.type === type)[0]);
  }

  get selectedQuestionType(): string {
  if (this.questionForm.get("questionType").value != null) {
      return this.questionForm.get("questionType").value.id;
    } else {
      return null;
    }

  }

  set selectedQuestionType(id: string) {

    this.questionForm.get("questionType").setValue(this.questionsTypes.filter(value => value.id === id)[0]);
    this.questionForm.get("type").setValue( this.questionForm.get("questionType").value.type);

    this.questionForm.get("options").setValue(this.referenceDataServie.getOptionsByQuetionType(
      this.questionForm.get("questionType").value.answerType))
  }


  questionForm = this.fb.group({
    id: [null],
    questionType: [null, Validators.required],
    label: ['', Validators.required],
    description: [''],
    questionLevel: [null],
    scoringMechanism: [null, Validators.required],
    labels: [],
    disabled: [false],
    type:[null,Validators.required],
    options:[null,Validators.required]
  });


  constructor(private fb: FormBuilder, private referenceDataServie: ReferenceDataService,
              private notificationService: NotificationService,
              private questionsService: QuestionsService, private route: ActivatedRoute,
              private sideNavService: SidenavService) {
    this.referenceDataServie.getData(RefDataType.QUESTION_LABEL, true).subscribe(dataArr => {
      this.questionLabels = dataArr;
    });
    this.referenceDataServie.getData<QuestionType>(RefDataType.QUESTION_TYPE, true).subscribe(dataArr => {
      this.questionsTypes = dataArr;
    });
    this.scoringMechanisms = this.referenceDataServie.getQuestionScoringMechanisms();
    this.questionLevels = this.referenceDataServie.getQuestionLevels();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.questionId) {
        this.questionId = params.questionId;
        if (this.questionId != null) {
          this.questionsService.get(this.questionId).subscribe(question => {
            this.mode = QuestionCreationPageComponent.editMode;
            this.originalQuestion = Object.assign({}, question);
            this.fillForm(question);
          },reason => console.error(reason));
        }
      } else {
        this.mode = QuestionCreationPageComponent.addMode;
        this.fillForm(<Question<any>>{
          id:'',
          labels: [],
          questionLevel: null,
          scoringMechanism: null,
          questionType: null,
          disabled: false,
          description:""
        });
      }
    });
  }

  onLabelChange(checked, label: QuestionLabel) {
    if (checked == true) {
      this.addLabel(label);
    } else {
      this.removeLabel(label);
    }

    /*if (this.question.labels.length > 0) {
      this.questionForm.patchValue({labels: this.question.labels});
    } else {
      this.questionForm.patchValue({labels: null});
    }*/
  }


  addLabel(label: QuestionLabel) {
    this.questionForm.get("labels").value.push(label);
  }

  removeLabel(label: QuestionLabel) {
    let index = this.questionForm.get("labels").value.indexOf(label);
    this.questionForm.get("labels").value.splice(index);
  }


  fillForm(question: Question<any>) {
    /* for (let field in question) {
       this.questionForm.controls[field].setValue(question[field], {emitEvent: true});
     }
 */

        this.question = question;
    this.questionForm.patchValue(question as any);
  }

  onSubmit(values) {
    //this.question = Object.assign(this.question, values);
    switch (this.mode) {
      case QuestionCreationPageComponent.addMode:
        this.addQuestion();
        break;
      case QuestionCreationPageComponent.editMode:
        this.updateQuestion();
        break;
    }
  }

  updateQuestion() {
    this.notificationService.startLoadingIndicator("Updating Question...")
    let question = this.questionForm.value;
    this.questionsService.update(question.id, question).then(() => {
      this.notificationService.showSuccessNotification("Question added successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to add question", err);
    });
  }

  addQuestion() {
    this.notificationService.startLoadingIndicator("Adding Question..")
    this.notificationService.startLoadingIndicator()
    let question = this.questionForm.value;
    this.questionsService.add(question).then(() => {
      this.notificationService.showSuccessNotification("Question added successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to update question", err);
    })
  }

  isLabelChecked(label: QuestionLabel): boolean {
    if ( this.questionForm.get("labels").value ) {
      return this.questionForm.get("labels").value .filter(value => value.name === label.name).length > 0
    } else {
      return false;
    }
  }

  reset() {
    //  this.questionForm.reset();
    // if (this.question) {
    //   this.fillForm(this.originalQuestion);
    // }
    this.back();
  }

  back() {
    this.sideNavService.close();
  }

  generateElementId(label : string){
    return label.replace(/\s/g, "");
  }

}
