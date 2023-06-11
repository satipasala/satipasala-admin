import { Component, OnInit, Input, Output } from '@angular/core';
import {Country, Permission, PermissionLevel, RefDataType, ReferenceDataService, Role} from '@satipasala/base';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  @Input() permission: Permission;
  @Input() editPermissionLevel:PermissionLevel;
  @Input() viewPermissionLevel:PermissionLevel;



  ngOnInit() {
  }

  onEditPermissionChange(checked: boolean) {
    if(checked){
      this.permission.view = true;
    }
  }

  onViewPermissionChange(checked: boolean) {
    if(!checked){
      this.permission.edit = false;
    }
  }

  generateElementId(collection : string){
    return collection.replace(/\s/g, "");
  }

 /* /!**
   * This method will iterate through the users allowedPermission array to check weather a given permission ( from all permissions list)
   * is enabled or not. One purpose of this function is to display users permissions in a window where allowed permissions are
   * marked against all permissions
   * @param {string} permissionToCheck
   * @returns {boolean}
   *!/

  public isPermissionEnabled(permissionToCheck: string): boolean {
    if (permissionToCheck == null) {
      return false;
    }

    for (let permission of this.allowedPermissions) {
      if (permission.name === permissionToCheck) {
        this.permission = permission;
        return true;
      }
    }
    return false;
  }

  addRemovePermission(permission: Permission, $checked) {
    if ($checked) {
      this.permissionAdded.emit(permission);
    } else {
      this.permissionRemoved.emit(permission)
    }
  }
*/

}
