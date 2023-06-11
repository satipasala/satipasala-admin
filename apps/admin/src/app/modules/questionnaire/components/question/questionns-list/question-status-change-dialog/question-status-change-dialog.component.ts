import { Component, Inject } from "@angular/core";
import { QuestionsService, Question } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'question-status-change-dialog',
  templateUrl: './question-status-change-dialog.component.html',
  styleUrls: ['./question-status-change-dialog.component.scss']
})
export class QuestionStatusChangeDialog {

  selectedQuestion: Question<any> = null;
  selectedQuestionStateToBeChanged: boolean = false;

  stateToBeChanged: string; // For popup dialog 

  constructor(public dialogRef: MatDialogRef<QuestionStatusChangeDialog>, private questionService: QuestionsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedQuestion = data.selectedQuestion;
    this.selectedQuestionStateToBeChanged = data.selecteQuestionStatus;
  }

  cancelUpdate(): void {
    this.dialogRef.close();
  }

  onConfirmStateChange() {
    this.selectedQuestion.disabled = this.selectedQuestionStateToBeChanged;
    this.questionService.update(this.selectedQuestion.id, this.selectedQuestion).then(() => {
      this.dialogRef.close(true)
    }).catch(err => {
      console.log(err);
      this.dialogRef.close(false);
    });
  }

  getQuestionStateToBeChanged() {
    return this.selectedQuestionStateToBeChanged ? 'disable' : 'enable';
  }

}
