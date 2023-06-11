import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { EventCategoryFormComponent } from "./event-category-form/event-category-form.component";
import { PermissionsService, RefDataType, ReferenceDataService, EventCategory } from "@satipasala/base";
import { ComponentType } from "@angular/cdk/portal";
import { RefDataTypeComponent } from "../../base";

@Component({
    selector: 'admin-event-categories',
    templateUrl: './eventCategories.component.html',
    styleUrls: ['./eventCategories.component.css']
})
export class EventCategoriesComponent extends RefDataTypeComponent<EventCategory> {

    constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
        public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
        super(RefDataType.EVENT_CATEGORY, "Event Categories", fireStore, dialog, referenceDataService, permissionsService, cdr);
    }

    refDataFormMinWidth(): string {
        return "300px";
    }

    createNewObject(): EventCategory {
        return new EventCategory();
    }

    getComponentType(): ComponentType<any> {
        return EventCategoryFormComponent;
    }

}
