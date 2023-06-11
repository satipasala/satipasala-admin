import {Component, Input, OnInit} from '@angular/core';
import {Chip} from "../../../../../base/src/lib/model/Chip";

@Component({
  selector: 's-chip',
  templateUrl: './s-chip.component.html',
  styleUrls: ['./s-chip.component.css']
})
export class SChip implements OnInit {
  @Input() matChip:Chip

  constructor() { }

  ngOnInit() {
  }

}
