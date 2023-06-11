import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {
  AuthService, Host,
  Language,
  NotificationService,
  ObjectUtils, OrderBy, PermissionsService,
  RefDataType,
  ReferenceDataService,
  Role,
  RolesService,
  SidenavService, StorageService,
  User,
  UsersService
} from "@satipasala/base";
import {Subject} from "rxjs";
import {FileUploadComponent} from "../../../uploads/file-upload/file-upload.component";
import {ActivatedRoute, Router} from "@angular/router";
import {USER_IMAGE_FOLDER} from "../../../../admin-const";
import {MatAccordion} from "@angular/material/expansion";
import {FilterGroup} from "../../../../../../../../libs/base/src/lib/impl/FirebaseDataSource";


@Component({
  selector: 'admin-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
  loggedInUser: User;
  user: User;
  userForm: FormGroup;
  userRoles: Role[];
  //organizations: Host[];
  mediums: Language[];
  registerTask: Subject<boolean> = new Subject();
  startDate = new Date(2000, 0, 1);
  minimalMode: "new-minimal" = "new-minimal";
  photoUrl: string = null;
  hide: boolean = true;
  private _mode: "new" | "edit" | "new-minimal";
  private generatedEmail;
  hostOrderBy: OrderBy[] = [{fieldPath: 'name', directionStr: 'asc'}];
  hostFilterBy: FilterGroup[];
  defaultSearchFields: string[] = ['name'];

  @ViewChild(FileUploadComponent, {static: false})
  private uploadComponent: FileUploadComponent;

  @ViewChild(MatAccordion, {static: false})
  private matAccordion: MatAccordion;


  constructor(private storageService:StorageService,public authService: AuthService, private fb: FormBuilder,
              private referenceDataService: ReferenceDataService, private rolesService: RolesService,
              private usersService: UsersService, private route: ActivatedRoute,
              private sideNavService: SidenavService, private notificationService: NotificationService,
              private permissionService: PermissionsService,
              private changeDetectorRef: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.permissionService.getHostsFilters('view').then(filters => {
      this.hostFilterBy = filters;
    });
    this.authService.getCurrentDbUser().subscribe(user => {
      this.loggedInUser = user;
      this.rolesService.queryCollection(ref => ref
        .where('roleLevel.access_level', '<=', user.userRole.roleLevel.access_level))
        .subscribe(dataArr => this.userRoles = dataArr);
    }, error => this.notificationService.showErrorNotification("Could not fetch user information", error));

    //todo fething all hosts for this is inefficient. change it to search based component


    this.referenceDataService.getData<Language>(RefDataType.LANGUAGE, true).subscribe(dataArr => this.mediums = dataArr);
    this.registerTask.subscribe(proceed => this.submitRegistrationForm(proceed));

    this.route.params.subscribe(params => {
      if (params.uid) {
        if (params.uid === "new-minimal") {
          this._mode = this.minimalMode;
          this.buildForm(this._mode);
          this.authService.getCurrentDbUser().subscribe(currentLoggedInUser => {
            this.usersService.get(currentLoggedInUser.email).subscribe(teacher => {
              this.fillMinimalForm(teacher);
            }, error => {
              console.log(error);
              this.notificationService.showErrorNotification("Could not fetch teacher information", error);
            });
          }, error => {
            console.log(error);
            this.notificationService.showErrorNotification("Could not fetch teacher information", error);
          });

        } else {
          this._mode = "edit";
          this.buildForm(this._mode);
          // Get user doc
          this.usersService.get(params.uid).subscribe(user => {
            this.user = user;
            this.storageService.getUserImagePath(this.user).subscribe(url =>
              this.photoUrl = url
            );
            this.fillForm();
          }, error => {
            console.log(error);
            this.notificationService.showErrorNotification("Could not fetch user information", error);
          });
        }
      } else {
        this._mode = "new";
        this.buildForm(this._mode);
      }
    });

  }

  buildForm(mode) {

    if (mode === this.minimalMode) {
      this.userForm = this.fb.group({
        'firstName': ['', [Validators.required, Validators.maxLength(25),]],
        'lastName': [''],
        'email': ['', [Validators.required, Validators.email,]],
        'password': ['', [Validators.required, Validators.minLength(6),]],
        'dob': ['', [Validators.required,]],
        'organizationInfo': ['', [Validators.required,]],
        'userRole': ['', [Validators.required,]],
        'disabled': [false],
        'admissionNo': []
      });
      this.changeDetectorRef.detectChanges();
      this.matAccordion.openAll();
    } else {
      this.userForm = this.fb.group({
        'firstName': ['', [Validators.required, Validators.maxLength(25),]],
        'lastName': [''],
        'email': [null, [Validators.required, Validators.email,]],
        'dob': ['', [Validators.required,]],
        'nic': [''],
        'phoneNumber': [''],
        'description': [''],
        'organizationInfo': ['', [Validators.required,]],
        'preferredMedium': [],
        'userRole': ['', [Validators.required,]],
        'disabled': [false],
        'admissionNo': []
      });

      if (mode !== 'edit') {
        this.userForm.addControl('password', new FormControl(null, [Validators.required, Validators.minLength(6)]))
      }
      this.changeDetectorRef.detectChanges();
    }

    if (mode === this.minimalMode) {
      this.userForm.controls['firstName'].valueChanges.subscribe(value => {
        this.setEmail(value, this.userForm.controls['lastName'].value);
      });

      this.userForm.controls['lastName'].valueChanges.subscribe(value => {
        this.setEmail(this.userForm.controls['firstName'].value, value);
      });
    }
  }

  setEmail(firstName, lastName) {
    if (!this.userForm.controls['email'].touched) {
      this.generatedEmail = firstName.toString().trim().toLowerCase() + lastName.toString().trim().toLowerCase() + '@satipasala.org';
      this.userForm.controls['email'].setValue(this.generatedEmail);
    }
  }

  /*  getHosts(user:User){
      this.permissionService.getHostsFilters('view').then(filters =>{
        this.hostFilterBy = filters;
        if(this.mode == "edit"){

        }

      })


      this.hostService.getAll().subscribe(dataArr => this.organizations = dataArr);
    }*/

  fillMinimalForm(teacher: User) {
    this.userForm.patchValue({
      organizationInfo: teacher.organizationInfo,
      password: "Sati@123",
      locationInfo: teacher.locationInfo,
      disabled: false
    });
  }

  fillForm() {
    this.userForm.patchValue(this.user as any);

    // Get date object from timestamp if dob is available
    if (this.user.dob) {
      const tmpDob = this.user.dob as any;
      this.userForm.patchValue({dob: tmpDob.toDate()});
    }

    // Get organization info
    if (this.user.organizationInfo) {
      this.userForm.patchValue({organizationInfo: this.user.organizationInfo});
    }
  }

  setOrganization(organization:Host){
    this.userForm.patchValue({organizationInfo: organization})
  }

  onSubmit() {
    if (this._mode === this.minimalMode) {
      //this.registerTask.next(true); //submit in minimal mode
      this.submitRegistrationForm(true);
    } else {
      this.uploadComponent.putFiles();
      if (!this.uploadComponent.startUpload) {
        this.registerTask.next(true); //submit form when user image is not present
      }
    }

  }

  private submitRegistrationForm(proceed: boolean) {
    if (!proceed) {
      this.notificationService.showErrorNotification("There are errors in the form!");
      return;
    }
    this.notificationService.startLoadingIndicator()
    this.user = this.userForm.value as User; // Get user object from the form

    this.user.userName = this.userForm.value['email'];
    this.user.uid = this.userForm.value['email'];
    this.user.displayName = this.userForm.value['firstName'] + " " + this.userForm.value['lastName'];
    if (this._mode !== this.minimalMode) {
      this.user.photoURL = (this.uploadComponent.startUpload) ? USER_IMAGE_FOLDER + this.userForm.value['email'] : this.photoUrl;
    }
    this.user.providerId = "password";
    this.user.createdAt = formatDate(new Date(), 'long', 'en');
    this.user.updatedAt = formatDate(new Date(), 'long', 'en');

    // Update host array with single value
    const selectedOrganization = <any>this.user.organizationInfo;

    this.user.organizationInfo = ObjectUtils.extractHostInfo(selectedOrganization);
    this.user._organizationsInfo = []; //Update string array for query purpose
    this.user._organizationsInfo.push(selectedOrganization.name); //this should be moved to cloud function


    const tmpRole = this.userForm.value['userRole'];
    if (tmpRole && tmpRole.id) {
      this.user.userRoleId = tmpRole.id;
      this.user.userRole = tmpRole;
      //this.user.userPermissions = tmpRole.allowedPermissions;
    }

    // Preferred medium is saved as a string in User object (Not the full object). Therefore form saved value could be the string value if user didn't select again)
    const tmpMedium = this.userForm.value['preferredMedium'];
    if (tmpMedium && tmpMedium.name) {
      this.user.preferredMedium = tmpMedium.name;
    }

    // Create or Update user
    if (this._mode === "new" || this._mode === this.minimalMode) {
      this.authService.createFirestoreseUser(this.user).subscribe(() => {
        this.notificationService.showSuccessNotification("User creation success");
        this.back();
      }, error => {
        this.notificationService.showErrorNotification(error);
      });
    } else {
      this.updateUserInformation(false);
    }
  }

  isMinimalMode() {
    return this._mode === this.minimalMode
  }

  /**
   * Update user information in firestore
   * @param {string} successMsg
   * @param {string} errorMsg
   */
  private updateUserInformation(isCreate: boolean) {
    this.authService.updateFirestoreUser(this.user).subscribe(() => {
      this.notificationService.showSuccessNotification(isCreate ? "User create success" : "User update success");
    }, error => {
      this.notificationService.showErrorNotification(isCreate ? "User create" : "User update", error);
    });
  }

  onUploadSuccess() {
    this.registerTask.next(true);
  }

  compareItems(i1: any, i2: any): boolean {
    return i1 && i2 && i1.name === i2;
  }

  compareRoles(i1: any, i2: any): boolean {
    return i1 && i2 && i1.id === i2.id;
  }

  compareOrgs(i1: any, i2: any): boolean {
    return i1 && i2 && i1.name === i2.name;
  }

  back() {
    this.sideNavService.close();
  }

  resetUserLoadedImage() {
    this.photoUrl = null;
  }

  getSubmitCaption() {
    return this._mode === "edit" ? "Update" : "Submit";
  }

  get mode(): "new" | "edit" | "new-minimal" {
    return this._mode;
  }

  set mode(value: "new" | "edit" | "new-minimal") {
    this._mode = value;
  }
}
