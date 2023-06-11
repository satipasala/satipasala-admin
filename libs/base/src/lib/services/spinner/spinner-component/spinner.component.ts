
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 's-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }

}
