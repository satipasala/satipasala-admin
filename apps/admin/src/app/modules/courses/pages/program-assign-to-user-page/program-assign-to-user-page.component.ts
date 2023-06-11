import {Component, OnInit} from '@angular/core';
import {Course, CoursesService, NotificationService, SidenavService} from "@satipasala/base";
import {ActivatedRoute, Router} from "@angular/router";
import {Program} from "../../../../../../../../libs/base/src/lib/model/Course";
import {ProgramService} from "../../../../../../../../libs/base/src/lib/services/program.service";

@Component({
  selector: 'admin-program-assign-to-user-page',
  templateUrl: './program-assign-to-user-page.component.html',
  styleUrls: ['./program-assign-to-user-page.component.scss']
})
export class ProgramAssignToUserPage implements OnInit {
  program: Program;

  constructor(
    private router: Router,
    private route: ActivatedRoute, private programService: ProgramService, private sideNavService: SidenavService,
    private notificationService: NotificationService) {

    /*This form receives edit, view, new*/
    this.route.params.subscribe(params => {
      this.programService.get(params.programId).subscribe(program => {
          this.program = program;
        }, err => {
          this.notificationService.showErrorNotification("Error retrieving course", err);
          setTimeout(() => {
            this.back();
          }, 1000)
        }
      )
    });

  }

  back() {
    this.sideNavService.close();
  }

  ngOnInit() {
  }

}
