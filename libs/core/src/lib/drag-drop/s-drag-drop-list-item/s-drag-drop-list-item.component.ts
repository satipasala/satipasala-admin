import {Component, Input, OnInit} from '@angular/core';
import {DragDropListItem} from "../../../../../base/src/lib/model/DragDropListItem";

@Component({
  selector: 's-drag-drop-list-item',
  templateUrl: './s-drag-drop-list-item.component.html',
  styleUrls: ['./s-drag-drop-list-item.component.scss']
})
export class SDragDropListItem implements OnInit {
  @Input() item:DragDropListItem;

  constructor() { }

  ngOnInit() {
  }

}
