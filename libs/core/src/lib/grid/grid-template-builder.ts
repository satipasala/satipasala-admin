import {QueryList} from "@angular/core";
import {SGridTile} from "./s-grid-tile/s-grid-tile.component";

export class GridTemplateBuilder {
  gridTemplateAreas:Array<Array<string>> =[];
  tiles:Array<SGridTile>;

  constructor() {
  }


  getGridTemplateAreas(){
    let area = '';
    this.gridTemplateAreas.forEach(value => {
        area+=''+value+' ';
    })
    return area;
  }
}
