import {Injectable} from "@angular/core";
import {FilterGroup} from "../impl/FirebaseDataSource";
import {AuthService} from "./auth.service"
import {Host} from "../..";


@Injectable()
export class PermissionsService {

  constructor(private authService: AuthService) {

  }

  editAuthorization: boolean = false;

  //todo there is a limitation since only one value is filtered in the security rule.

  public getHostsFilters(mainPermission: 'view' | 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      const filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        const filtersGroup1: FilterGroup = new FilterGroup("default");
        const filtersGroup2: FilterGroup = new FilterGroup("assigned-host");
        if (user.userRole && user.userRole.permissionLevelGroup) {
          if (user.userRole.permissionLevelGroup[mainPermission].id == 'global') {
            filterBy.push(filtersGroup1);
          } else {
            if (user.addressInfo) {
              if (user.userRole.permissionLevelGroup[mainPermission].id == 'country') {
                filtersGroup1.filters.push({
                  fieldPath: "addressInfo.country.id",
                  opStr: "==",
                  value: user.addressInfo.country.id
                });

              } else if (user.userRole.permissionLevelGroup[mainPermission].id == 'district') {
                filtersGroup1.filters.push({
                  fieldPath: "addressInfo.state.id",
                  opStr: "==",
                  value: user.addressInfo.state.id
                });

              } else if (user.userRole.permissionLevelGroup[mainPermission].id == 'city') {
                filtersGroup1.filters.push({
                  fieldPath: "addressInfo.city.id",
                  opStr: "==",
                  value: user.addressInfo.city.id
                });
              }

            } else if (user.userRole.permissionLevelGroup[mainPermission].id === 'organization' && user.organizationInfo) {
              filtersGroup1.filters.push({
                fieldPath: "id",
                opStr: "==",
                value: user.organizationInfo.id
              });
            }


            filtersGroup1.filters.push({
              fieldPath: "type.name",
              opStr: "in",
              value: Object.keys(user.userRole.allowedOrgTypes)
            });

            /**
             * user will always see the organization that assigned to user. it is treated as an OR query.
             * therefore separate filter group should be created.
             */
            if (user.organizationInfo) {
              filtersGroup2.filters.push({
                fieldPath: "id",
                opStr: "==",
                value: user.organizationInfo.id
              });
              filterBy.push(filtersGroup2);
            }

            filterBy.push(filtersGroup1);
          }

          resolve(filterBy);
        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }

  public getUsersFilters(mainPermission: 'view' | "edit"): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      const filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
          const filtersGroup1: FilterGroup = new FilterGroup("default");

          if (user.userRole && user.userRole.permissionLevelGroup) {
            if (user.userRole.permissionLevelGroup[mainPermission].id === 'global') {
              filterBy.push(filtersGroup1);
            } else {
              if (user.addressInfo) {
                if (user.userRole.permissionLevelGroup[mainPermission].id === 'country') {
                  filtersGroup1.filters.push({
                    fieldPath: "addressInfo.country.id",
                    opStr: "==",
                    value: user.addressInfo.country.id
                  });

                } else if (user.userRole.permissionLevelGroup[mainPermission].id === 'district') {
                  filtersGroup1.filters.push({
                    fieldPath: "addressInfo.state.id",
                    opStr: "==",
                    value: user.addressInfo.state.id
                  });

                } else if (user.userRole.permissionLevelGroup[mainPermission].id === 'city') {
                  filtersGroup1.filters.push({
                    fieldPath: "addressInfo.city.id",
                    opStr: "==",
                    value: user.addressInfo.city.id
                  });
                }

              } else if (user.userRole.permissionLevelGroup[mainPermission].id === 'organization' && user.organizationInfo) {
                filtersGroup1.filters.push({
                  fieldPath: "organizationInfo.id",
                  opStr: "==",
                  value: user.organizationInfo.id
                });
              }

              filtersGroup1.filters.push({
                fieldPath: "organizationInfo.type.name",
                opStr: "in",
                value: Object.keys(user.userRole.allowedOrgTypes)
              });

              if (mainPermission === 'edit') {
                filtersGroup1.filters.push({
                  fieldPath: "userRole.roleLevel.access_level",
                  opStr: "<",
                  value: user.userRole.roleLevel.access_level
                });
              }

              filterBy.push(filtersGroup1);
            }

            resolve(filterBy);
          } else {
            reject("Invalid role")
          }

        }
        ,
        error => reject(error)
      )

    })
  }

  public getCurrentUserAccessLevel(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentDbUser().subscribe(user => {
        const accessLevel = user.userRole.roleLevel.access_level;
        const currentUser = user.email;
        resolve({user: currentUser, access: accessLevel})
      }, error => {
        reject(error)
      })
    })
  }

  public getUsersEditFilters(mainPermission: 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      this.getUsersFilters("view").then(filterGroups => {
        this.authService.getCurrentDbUser().subscribe(user => {
            filterGroups.forEach(filterGroup => {
              filterGroup.filters.push({
                fieldPath: "userRole.roleLevel.access_level",
                opStr: "<",
                value: user.userRole.roleLevel.access_level
              })
            });
            resolve(filterGroups);
          },
          error => {
            reject(error)
          })

      }).catch(reason => {
        reject(reason)
      })
    });
  }

  public getProgramFilters(mainPermission: 'view' | 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      let filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        if (user.userRole && user.userRole.permissionLevelGroup) {
          filterBy = [];
          resolve(filterBy);
        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }

  public getCourseFilters(mainPermission: 'view' | 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      let filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        if (user.userRole && user.userRole.permissionLevelGroup) {
          filterBy = [];
          resolve(filterBy);
        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }

  public getEventFilters(mainPermission: 'view' | 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      let filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        if (user.userRole && user.userRole.permissionLevelGroup) {
          filterBy = [];
          resolve(filterBy);

        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }

  public getQuestionnaireFilters(mainPermission: 'view' | 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      let filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        if (user.userRole && user.userRole.permissionLevelGroup) {
          filterBy = [];
          resolve(filterBy);
        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }

  public getQuestionFilters(mainPermission: 'view' | 'edit'): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      let filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        if (user.userRole && user.userRole.permissionLevelGroup) {
          filterBy = [];
          resolve(filterBy);
        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }


  public getRolesFilters(): Promise<FilterGroup[]> {
    return new Promise((resolve, reject) => {
      const filterBy: FilterGroup[] = [];
      this.authService.getCurrentDbUser().subscribe(user => {
        const filtersGroup1: FilterGroup = new FilterGroup("default");
        const filtersGroup2: FilterGroup = new FilterGroup("assigned-role");
        if (user.userRole && user.userRole.roleLevel) {
          if (user.userRole.roleLevel.id === 'super_admin') {
            filterBy.push(filtersGroup1);
          } else {

            filtersGroup1.filters.push({
              fieldPath: "roleLevel.access_level",
              opStr: "<=",
              value: user.userRole.roleLevel.access_level
            });


            /**
             * user will always see the role that assigned to user. it is treated as an OR query.
             * therefore separate filter group should be created.
             */
            filtersGroup2.filters.push({
              fieldPath: "roleLevel.id",
              opStr: "==",
              value: user.userRole.roleLevel.id
            });

            filterBy.push(filtersGroup2);
            filterBy.push(filtersGroup1);
          }

          resolve(filterBy);
        } else {
          reject("Invalid role")
        }
      }, error => reject(error))

    })
  }

  //check authorization

  isRoleAuthorized(collectionName: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      const rolePermission: { view: boolean, edit: boolean } = {view: false, edit: false};
      this.authService.getCurrentDbUser().subscribe(user => {
        if (user?.userRole?.allowedPermissions?.[collectionName]) {
          rolePermission.view = user.userRole.allowedPermissions[collectionName]['view'];
          rolePermission.edit = user.userRole.allowedPermissions[collectionName]['edit'];
        }
        resolve(rolePermission);
      }, error => reject(error))
    })
  }


  //user functions are identical to firestore rules


  isAuthorizedToEditUsers(mainPermission, targetUser, updatedTargetUser): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentDbUser().subscribe(user => {
        resolve(this.isAuthtorisedToUser(mainPermission, user, targetUser)
          && this.isAuthtorisedToUser(mainPermission, user, updatedTargetUser)
          && updatedTargetUser.email == targetUser.email
          && updatedTargetUser.uid == targetUser.uid
          && (user.userRole.roleLevel.access_level > targetUser.userRole?.roleLevel?.access_level
            || user.userRole.roleLevel.id == 'super_admin' && user.email != updatedTargetUser.email
            || (user.email == updatedTargetUser.email
              && user.userRole == updatedTargetUser.userRole)
          ));
      }, error => {
        reject(error)
      })

    })
  }

  isAuthorizedToEditEvent(mainPermission): Promise<boolean>  {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentDbUser().subscribe(user => {
        resolve(this.isAuthorizedToEvents('edit', user))
      },error => reject(error))
    })
  }

  isAuthorizedToEvents(mainPermission, user) {
    return user.userRole.isActive
      && (user.userRole.allowedPermissions['collection_events'][mainPermission] ||
        user.userRole.roleLevel.id == 'super_admin')
  }

  public isAuthorizedToEditHosts(host: Host): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let editable: boolean = false;
      this.authService.getCurrentDbUser().subscribe(user => {
          editable = user.userRole.permissionLevelGroup['edit'].id == 'global'
            || (user.userRole.permissionLevelGroup['edit'].id === 'country' && host.addressInfo.city.state.country.id === user.addressInfo?.city.state.country.id)
            || (user.userRole.permissionLevelGroup['edit'].id == 'district' && host.addressInfo?.city.state.id == user.addressInfo?.city.state?.id)
            || (user.userRole.permissionLevelGroup['edit'].id == 'city' && host.addressInfo?.city?.id == user.addressInfo?.city?.id)
            || (user.userRole.permissionLevelGroup['edit'].id == 'organization' && user?.organizationInfo.id === host.id)
          resolve(editable);
        },
        error => resolve(editable));

    })

  }

  isAuthorizedToCreateUsers(mainPermission, user, newUser) {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentDbUser().subscribe(user => {
        resolve(this.isAuthtorisedToUser(mainPermission, user, newUser)
          && user.userRole.roleLevel.access_level >= 30)
      }, error => {
        reject(error)
      })
    });
  }


  private isAuthtorisedToUser(mainPermission, user, targetUser) {
    return user.email == targetUser.email || (user.userRole.isActive
      && ((user.userRole.roleLevel.access_level > targetUser.userRole?.roleLevel?.access_level) || user.userRole.roleLevel.id == 'super_admin')
      && user.userRole.allowedPermissions['collection_users'][mainPermission] &&
      (user.userRole.permissionLevelGroup[mainPermission].id == 'global'
        || user?.organizationInfo.id == targetUser?.organizationInfo?.id
        || ((targetUser?.organizationInfo?.type.name in user.userRole.allowedOrgTypes &&
          ((user.userRole.permissionLevelGroup[mainPermission].id == 'country' && user.addressInfo?.country.id == targetUser.addressInfo?.country.id) ||
            (user.userRole.permissionLevelGroup[mainPermission].id == 'district' && user.addressInfo?.state.id == targetUser.addressInfo?.state.id) ||
            (user.userRole.permissionLevelGroup[mainPermission].id == 'city' && user.addressInfo?.city.id == targetUser.addressInfo?.city.id) ||
            (user.userRole.permissionLevelGroup[mainPermission].id == 'organization' &&
              user.organizationInfo?.id == targetUser.organizationInfo?.id)
          )))));
  }


  isAuthorizedToRole(collection: string, mainPermission: 'view' | 'edit'): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentDbUser().subscribe(user => {
        // if (user.userRole.roleLevel.id == 'super_admin' && user?.userRole?.allowedPermissions[collection][mainPermission]) {
        if (user.userRole.roleLevel.id == 'super_admin') {
          resolve(true);
        } else {
          resolve(false)
        }
      }, error => reject(error))
    })
  }
}
