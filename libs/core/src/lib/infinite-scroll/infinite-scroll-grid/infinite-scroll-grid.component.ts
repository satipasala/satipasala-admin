import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { throttleTime } from 'rxjs/operators';
import { InfiniteScrollService } from "../../../../../base/src/lib/services/InfiniteScrollService";
import { BehaviorSubject } from "rxjs";
import { AbstractDataSourceManager } from "../../AbstractDataSourceManager";

@Component({
  selector: 's-infinite-scroll-grid',
  templateUrl: './infinite-scroll-grid.component.html',
  styleUrls: ['./infinite-scroll-grid.component.scss'],
  providers: [InfiniteScrollService]
})
export class SInfiniteScrollGrid extends AbstractDataSourceManager implements OnInit {
  @Output() onAddItem: EventEmitter<any> = new EventEmitter();

  @Input() addItemEnabled: boolean;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;
  @ContentChild(TemplateRef, { static: true, read: TemplateRef }) templateVariable: TemplateRef<any>;

  offset = new BehaviorSubject(null);

  constructor(protected scrollService: InfiniteScrollService) {
    super(scrollService);
    //this.infinite = batchMap.pipe(map(v => Object.values(v).sort((a, b) => a['name'] < b['name'] ? -1 : 1)));
  }

  ngOnInit (): void {

    if (!this.addItemEnabled) {
      return
    }

    this.addItemEnabled = this.onAddItem.observers.length > 0;
    this.offset.pipe(
      throttleTime(100)
    ).subscribe(value => {
      this.getBatch()
    });

    this.viewport.elementScrolled().subscribe(value => {
      this.nextBatch(this.batchSize);
    })
  }

  nextBatch (offset) {
    if (this.dataSource.reachedEnd() === true) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);

    const element = this.viewport.elementRef.nativeElement;
    const atBottom = Math.abs(element.scrollTop + element.clientHeight - element.scrollHeight) < 25;
    if (end === total && atBottom) {
      this.offset.next(offset);
    }
  }

  isLoading(){
    return this.dataSource.isDataLoading();
  }


  addNew () {
    this.onAddItem.emit();
  }
}
