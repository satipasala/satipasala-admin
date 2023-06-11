
import {PermissionLevelGroup} from "./PermissionLevelGroup";
import {RoleLevel} from "./RoleLevel";

export interface Role {
  id: string,
  name: string,
  isActive?: boolean,
  createdAt?: Date | null,
  updatedAt?: Date | null,
  description: string,
  courses?: Object,
  allowedOrgTypes: Object, //object map of OrganizationType
  allowedPermissions: Object,
  roleLevel:RoleLevel // access level distinguish low level and high level uers even they have same permission accesses
  permissionLevelGroup:PermissionLevelGroup
}

