import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './custom-upload.component.html'
})
export class CustomUploadComponent implements OnInit {
  fileType: string;
  storageLoc: string;

  /**
   * Constructor of Custom file upload component
   * @param route ActivatedRoute instance
   */
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
     this.fileType = this.route.snapshot.data['type'];
     this.storageLoc = this.route.snapshot.data['location'];
  }
}
