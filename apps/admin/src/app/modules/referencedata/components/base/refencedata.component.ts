import { AfterViewInit, ChangeDetectorRef, Directive, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { PermissionsService, RefDataType, ReferenceDataService } from "@satipasala/base";
import { RefDataContextMenuItem, RefDataContextMenuType } from "./context-menu/context-menu.component";
import { ComponentType } from "@angular/cdk/portal";
import { ReferenceDataTableDatasource } from "./referencedata-table.datasource";
import { RefDataFormObject, ViewType } from "./referencedata-form.dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { RefData } from "../../../../../../../../libs/base/src/lib/model/referencedata/RefData";
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';

@Directive()
export abstract class RefDataTypeComponent<T extends RefData> implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  public dataSource: ReferenceDataTableDatasource<T>;
  public pageEvent: PageEvent;
  public rolePermission: Object;

  protected constructor(protected refDataType: RefDataType, public title: string, protected fireStore: AngularFirestore,
    protected dialog: MatDialog, protected referenceDataService: ReferenceDataService,
    public permissionsService: PermissionsService, protected cdr: ChangeDetectorRef) {
  }

  /**
   *  Add/View/Edit form minimum width
   *
   * @returns {string}
   */
  abstract refDataFormMinWidth(): string;

  /**
   * New object for create action
   *
   * @returns {T}
   */
  abstract createNewObject(): T;

  /**
   * Component type for Add/View/Edit form dialog
   *
   * @returns {ComponentType<C>}
   */
  abstract getComponentType<C>(): ComponentType<C>;


  ngOnInit() {
    this.dataSource = new ReferenceDataTableDatasource<T>(this.paginator, this.sort, this.fireStore, this.refDataType, this.referenceDataService, this.cdr);
    this.permissionsService.isRoleAuthorized('collection_referencedata').then(permission => this.rolePermission = permission).catch(err => console.error(err));
  }

  ngAfterViewInit(): void {
    this.dataSource.ngAfterViewInit();
  }

  loadMore(event: PageEvent) {
    this.dataSource.loadMore(event);
  }

  /**
   * Add new record
   */
  addNew(): void {
    this.openRefDataFormDialog('400px', new RefDataFormObject(ViewType.CREATE, this.createNewObject())).afterClosed().subscribe(result => {
      if (result) {
        this.referenceDataService.mergeData(this.refDataType, result); //DB merge
      }
    });
  }

  /**
   * Perform context menu action
   *
   * @param {RefDataContextMenuItem<T>} contextMenuItem
   */
  onContextMenuCommand(contextMenuItem: RefDataContextMenuItem<any>): void {
    switch (contextMenuItem.type) {
      case RefDataContextMenuType.VIEW:
        this.openRefDataFormDialog(this.refDataFormMinWidth(), contextMenuItem);
        break;
      case RefDataContextMenuType.EDIT:
        this.openRefDataFormDialog(this.refDataFormMinWidth(), contextMenuItem).afterClosed().subscribe(result => {
          if (result) {
            this.referenceDataService.mergeData(this.refDataType, result);//DB merge
          }
        });
        break;
      case RefDataContextMenuType.DELETE:
        const dialogData = new ConfirmDialogModel("Confirm Action", `Are you sure you want to delete "${contextMenuItem.data.name}"?`);
        this.dialog.open(ConfirmationDialogComponent, {
          minWidth: "300px",
          data: dialogData
        }).afterClosed().subscribe(result => {
          if (result) {
            this.referenceDataService.removeData(this.refDataType, contextMenuItem.data).then(value => {
              this.dataSource.fetchData();
            }); //DB remove
          }
        });
        break;
    }
  }

  /**
   * Open form dialog
   *
   * @param {string} minWidth
   * @param data
   * @returns {MatDialogRef<any>}
   */
  openRefDataFormDialog(minWidth: string, data: any): MatDialogRef<any> {
    return this.dialog.open(this.getComponentType(), {
      minWidth: minWidth,
      data: data,
      disableClose: true
    });
  }


}
