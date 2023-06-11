import {Component, OnInit} from '@angular/core';
import {
  Permission,
  RefDataType,
  ReferenceDataService,
  Role,
  RoleLevel,
  PermissionLevel,
  LocalDataSource,
  OrganizationType,
  ObjectUtils, NotificationService, SidenavService
} from "@satipasala/base";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesService} from "@satipasala/base";
import {Observable} from "rxjs";
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'admin-role-permission-info',
  templateUrl: './role-permission-info.component.html',
  styleUrls: ['./role-permission-info.component.scss']
})
export class RolePermissionInfoComponent implements OnInit {

  permissions: Permission[];
  roleId: string;
  role: Role;
  success: boolean = false;
  roleLevels: RoleLevel[];
  dataSource: LocalDataSource;
  permissionLevels: PermissionLevel[];
  orgTypes: OrganizationType[];
  roleForm: FormGroup;
  permissionLevelGroupFrom: FormGroup;
  mode: "new" | "update";

  constructor(private fb: FormBuilder, protected router: Router, protected route: ActivatedRoute, private referenceDataService: ReferenceDataService,
              protected rolesService: RolesService, private notificationService: NotificationService,
              private sideNavService: SidenavService
  ) {
    this.buildForm();
  }

  compareOrgTypes(i1: OrganizationType, i2: OrganizationType) {
    return i1 && i2 && i1.name === i2.name;
  }

  compareRoleLevel(i1: RoleLevel, i2: RoleLevel):
    boolean {
    return i1 && i2 && i1.id === i2.id;
  }

  comparePermissionLevel(i1: PermissionLevel, i2: PermissionLevel):
    boolean {
    return i1 && i2 && i1.id === i2.id;
  }

  ngOnInit() {
    this.success = false;
    this.route.params.subscribe(params => {
      if (params.roleId) {
        if (params.roleId === 'new') {
          this.mode = "new";
          this.role = <Role>{};
          this.fetchData();
        } else {
          this.mode = "update";
          this.roleId = params.roleId;
          this.rolesService.get(this.roleId).subscribe(roleDoc => {
            this.role = roleDoc;
            this.fetchData();
          },reason =>  this.notificationService.showErrorNotification(reason));
        }

      } else {
        this.notificationService.showSuccessNotification("Invalid Request !!!");
      }
    });
  }


  fetchData() {

    this.roleForm.patchValue({
      name: this.role.name,
      roleLevel: this.role.roleLevel,
      permissionLevelGroup: this.role.permissionLevelGroup ? this.role.permissionLevelGroup : {},
      allowedOrgTypes: this.role.allowedOrgTypes ? Object.values(this.role.allowedOrgTypes) : []
    });

    this.referenceDataService.getData<Permission>(RefDataType.PERMISSION, false).subscribe(permissions => {
      this.permissions = permissions;
      this.checkForNewPermissions();
      if (this.dataSource == null) {
        this.dataSource = new LocalDataSource(Object.values(this.role.allowedPermissions));
      } else {
        this.dataSource.dataArray = Object.values(this.role.allowedPermissions);
      }

    }, error => {
      this.notificationService.showErrorNotification("Error retrieving permissions");
    });

    this.referenceDataService.getData<RoleLevel>(RefDataType.ROLE_LEVEL, true).subscribe(roleLevels => {
      this.roleLevels = roleLevels;
    }, error => {
      this.notificationService.showErrorNotification("Error retrieving role levels");
    });

    this.referenceDataService.getData<PermissionLevel>(RefDataType.PERMISSION_LEVEL, true).subscribe(permissionLevels => {
      this.permissionLevels = permissionLevels.sort((a, b) => {
        return a.access_level - b.access_level
      });
    }, error => {
      this.notificationService.showErrorNotification("Error retrieving permissionLevels");
    });

    this.referenceDataService.getData<OrganizationType>(RefDataType.ORGANIZATION_TYPE, true).subscribe(orgTypes => {
      this.orgTypes = orgTypes
    }, error => {
      this.notificationService.showErrorNotification("Error retrieving organization tpes");
    });
  }

//this might not necessary. it is added to avoid any data inconsistancies.
  checkForNewPermissions() {
    if (!this.role.allowedPermissions) {
      this.role.allowedPermissions = {}
    }
    this.permissions.forEach(permission => {
      if (this.role.allowedPermissions[permission.name] == null) {
        this.role.allowedPermissions[permission.name] = permission;
      }
    })

  }

  buildForm() {
    this.permissionLevelGroupFrom = this.fb.group({
      view: ['', [Validators.required]],
      edit: ['', [Validators.required]]
    });

    this.roleForm = this.fb.group({
      roleLevel: ['', [Validators.required]],
      permissionLevelGroup: this.permissionLevelGroupFrom,
      allowedOrgTypes: [[], [Validators.required]],
      name: ['', Validators.required]
    });
  }

  savePermission() {
    if (this.roleForm.invalid) {
      return;
    }
    this.addFormValues();
    this.notificationService.startLoadingIndicator("Starting Role Update...")
    this.rolesService.update(this.roleId, this.role).then(() => {
      this.notificationService.showSuccessNotification("Role Update");
      this.back();
    }).catch(err => {
      this.notificationService.showErrorNotification("Role Update");
    });
  }

  addNewRole() {
    this.notificationService.startLoadingIndicator("Adding new role")
    this.addFormValues();
    this.role.id = this.getRoleId();
    this.role.isActive = true;
    this.role.createdAt = new Date();
    this.role.updatedAt = new Date();
    this.rolesService.setDoc(this.role.id, this.role).then(() => {
      console.log("Saved");
      this.success = true;
      this.notificationService.showSuccessNotification("Role registration successful");
      this.back();
    }).catch(err => {
      console.error(err);
      this.notificationService.showErrorNotification("Role registration failed!!!", err);
      this.success = false;
    });
  }

  addFormValues() {
    let formValue = this.roleForm.value;
    formValue.allowedOrgTypes = this.roleForm.value.allowedOrgTypes instanceof Array ?
      ObjectUtils.mapFromArray(this.roleForm.value.allowedOrgTypes, 'name') : this.roleForm.value.allowedOrgTypes;
    this.role = Object.assign(this.role, this.roleForm.value);
  }

  getRoleId() {
    return this.role.name.trim().replace(/\s+/g, "_").toUpperCase();
  }

  back() {
    this.sideNavService.close();
  }

}
