import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {Url} from "url";

@Component({
  selector: 'admin-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
  styleUrls: ['./auto-complete-search.component.css']
})
export class AutoCompleteSearchComponent implements OnInit {
  @Input() collectionName : string;
  @Input() searchField: string;

  allResults = [];
  validResults: string[];
  downloadURL: string;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getAllResults().subscribe((res) => {
      console.log(res);
      this.allResults = res;
    });

    this.storage.ref('profile_pictures/kalharm@ebuilder.com').getDownloadURL().subscribe( u => this.downloadURL = u);
  }

  search($event) {
    let q = $event.target.value;
    this.prepareSearchResult(q);
  }

  prepareSearchResult(q: string){
    this.validResults = [];
    if(!q || !q.trim()){return;}
    for(let i = 0; i < this.allResults.length; ++i){
       let doc = this.allResults[i];
       if(doc[this.searchField].toUpperCase().indexOf(q.toUpperCase()) !== -1){
          this.validResults.push(doc[this.searchField]);
       }
    }
  }

  getAllResults() {
    return this.afs.collection(this.collectionName, ref => ref.orderBy(this.searchField)).valueChanges();
  }
}
