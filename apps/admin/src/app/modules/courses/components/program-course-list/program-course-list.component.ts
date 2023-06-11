import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { SidenavService, NotificationService} from "@satipasala/base";
import {PageEvent} from "@angular/material/paginator";
import {ProgramService} from "../../../../../../../../libs/base/src/lib/services/program.service";
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";

@Component({
  selector: 'admin-program-course-list',
  templateUrl: './program-course-list.component.html',
  styleUrls: ['./program-course-list.component.scss']
})
export class ProgramCourseListComponent implements OnInit, OnDestroy {
  program: Program;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private programService: ProgramService,
    private sideNavService: SidenavService,
    private notificationService: NotificationService) {

  }

  ngOnInit() {
    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {

      if (params.programId) {
        this.programService.get(params.programId).subscribe(program => {
            this.program = program;
          }, err => {
            this.notificationService.showErrorNotification("Error retrieving program", err);
            setTimeout(() => {
              this.back();
            }, 1000)
          }
        )
      } else {
        // this.backToCourseManage();
      }
    });
  }

  back(){
    this.sideNavService.close();
  }

  ngAfterViewInit(): void {
  }

  loadMore(event: PageEvent) {
  }

  ngOnDestroy(): void {
  }
}
