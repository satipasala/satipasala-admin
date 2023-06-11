import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import {
  NotificationService,
  Questionnaire,
  QuestionnaireService,
  SidenavService,
  OrderBy,
  SearchFilter
} from "@satipasala/base";
import { FilterGroup } from 'libs/base/src/lib/impl/FirebaseDataSource';
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";
import {ProgramService} from "../../../../../../../../libs/base/src/lib/services/program.service";

@Component({
  selector: 'admin-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.scss']
})
export class ProgramFormComponent implements OnInit {

  static editMode: "edit" = "edit";
  static addMode: "add" = "add";
  mode: "edit" | "add";

  programForm: FormGroup;
  coursesForm: FormGroup;

  public program: Program;


  public questionnaires: Questionnaire[] = [];
  public formTitle: string;
  public submitBtnText: string;

  searchFields: string[] = ['name'];
  orderBy: OrderBy[] = [{ fieldPath: 'name', directionStr: 'asc' }];
  searchBy: SearchFilter[] = [];
  filterBy: FilterGroup[];

  get questionnaire(): string {
    if (this.program.questionnaire) {
      return this.program.questionnaire.name;
    } else {
      return null;
    }

  }

  set questionnaire(questionnaireName: string) {
    this.programForm.patchValue({ questionnaire: questionnaireName });
    this.program.questionnaire = this.questionnaires.filter(questionnaire => questionnaire.name === questionnaireName)[0]
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private questionnaireService: QuestionnaireService,
    private sideNavService: SidenavService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.programForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [''],
      facilitatorsCount: [null, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(5)])
      ],
      numberOfFeedback: [null, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(10)])
      ],
      questionnaire: [null, Validators.required]
    });

    // need to attach this to courseForm
    this.coursesForm = this.formBuilder.group({
      'courses': new FormArray([])
    });

    this.questionnaireService.getAll().subscribe(questionnaires => {
      this.questionnaires = questionnaires;
    });


    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {

      if (params.programId === 'new') {
        this.mode = ProgramFormComponent.addMode;
        this.formTitle = "Create Program";
        this.submitBtnText = "Add";
        let program = <Program>{
          courses: {},
          status: 'notstarted',
          description: '',
          mandatory: false
        };
        this.fillForm(program);
      } else if (params.action === 'edit') {
        this.mode = ProgramFormComponent.editMode;
        this.formTitle = "Edit program";
        this.submitBtnText = "Update";
        this.programService.get(params.programId).subscribe(program => {
          this.fillForm(program);
        }, err => {
          this.notificationService.showErrorNotification("Error retrieving program", err);
          setTimeout(() => {
            this.back();
          }, 1000)
        }
        )
      } else {
        this.back();
      }
    });
  }

  fillForm(program: Program) {
    this.program = program;
    this.programForm.patchValue({
      name: this.program.name,
      description: this.program.description,
      facilitators: this.program.facilitatorsCount,
      numberOfFeedback: this.program.numberOfFeedback
    });

    if (this.program.questionnaire) {
      this.programForm.patchValue({
        questionnaire: this.program.questionnaire.name
      });
    }

    this.program.tempCourses = {...this.program.courses}
  }

  onActivitiesChange() {
    this.programForm.patchValue({ courses: this.program.courses })
  }


  onSubmit() {
    this.program.courses = {...this.program.tempCourses};
    delete this.program['tempCourses']
    switch (this.mode) {
      case ProgramFormComponent.addMode:
        this.addProgram();
        break;
      case ProgramFormComponent.editMode:
        this.updateProgram();
        break;
    }
  }

  updateProgram() {

    this.notificationService.startLoadingIndicator();
    this.programService.update(this.program.id, this.program).then(() => {
      this.notificationService.showSuccessNotification("program updated successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to update program", err);
    });
  }

  addProgram() {
    this.notificationService.startLoadingIndicator();
    this.program.id = this.getProgramId();
    this.programService.add(this.program).then(() => {
      this.notificationService.showSuccessNotification("Program created successfully");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Failed to add program", err)
    })
  }

  getProgramId() {
    return this.program.name.trim().replace(/\s+/g, "_").toUpperCase();
  }

  back() {
    this.sideNavService.close();
  }

}
