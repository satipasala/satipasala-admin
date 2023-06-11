import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DragDropList} from "../../../../../base/src/lib/model/DragDropList";
import {SElement} from "../../s-element";
import {DragDropListItem} from "../../../../../base/src/lib/model/DragDropListItem";

@Component({
  selector: 's-drag-drop-list',
  templateUrl: './s-drag-drop-list.component.html',
  styleUrls: ['./s-drag-drop-list.component.scss']
})
export class SDragDropList extends SElement implements OnInit {
  @Input() dragDropLists:Array<DragDropList<DragDropListItem>>;
  columns:number =1;
  @Input() rowHeight:string ="1:1";

  constructor(public _element: ElementRef<HTMLElement>) {
    super(_element );

  }

  ngOnInit() {
    this.columns = this.dragDropLists.length;
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}



