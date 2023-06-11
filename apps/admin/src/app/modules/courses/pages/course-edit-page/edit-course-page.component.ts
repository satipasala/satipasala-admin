import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.css']
})
export class EditCoursePage {


  constructor(private fb: FormBuilder) {}

  onSubmit() {
    // alert('Thanks!');
    console.log('Thanks');
  }
}
