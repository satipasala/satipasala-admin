import {Component, Input, OnInit} from '@angular/core';
import {AuditInfo} from "@satipasala/base";

@Component({
  selector: 'admin-audit-item',
  templateUrl: './audit-item.component.html',
  styleUrls: ['./audit-item.component.scss']
})
export class AuditItemComponent implements OnInit {
  @Input() auditInfo:AuditInfo;
  constructor() { }

  ngOnInit(): void {
  }


  public getColor(type) {
    switch (type) {
      case 'google.firestore.document.update':
        return 'primary';
      case 'google.firestore.document.create':
        return 'accent';
      case 'google.firestore.document.delete':
        return 'warn';
    }
  }

}
