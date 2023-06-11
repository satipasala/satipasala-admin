import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';


@Component({
  selector: 'admin-base-ref-data-card',
  templateUrl: './base-ref-data-card.component.html',
  styleUrls: ['./base-ref-data-card.component.scss']
})
export class BaseRefDataCard implements OnInit {

  @Input() refDataObj: any;
  @Input() title;
  @Input() subTitle;
  @Input() image = 'assets/images/referecedata.png';

  @Output() onContextMenuCommand: EventEmitter<any> = new EventEmitter();
  @ContentChild(TemplateRef, {static: true, read: TemplateRef}) templateVariable: TemplateRef<any>;

  constructor() {
  }

  contextMenuCommand(any) {
    this.onContextMenuCommand.emit(any)
  }

  ngOnInit() {
  }



}
