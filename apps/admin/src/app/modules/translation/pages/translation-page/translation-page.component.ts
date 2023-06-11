import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateApiService} from "../../service/translate-api.service";
import {TranslateText} from "../../service/translate-text.TranslateText";
import {GlossaryService} from "../../service/glossary.service";
import {GlossaryTableComponent} from "../../components/glossary-table/glossary-table.component";

@Component({
  selector: 'admin-translation-page',
  templateUrl: './translation-page.component.html',
  styleUrls: ['./translation-page.component.scss'],
  providers: [TranslateApiService, GlossaryService, GlossaryTableComponent]
})


export class TranslationPage implements OnInit {

  translationForm: FormGroup;
  glossaryService: GlossaryService;
  glossaryTableComponent: GlossaryTableComponent;

  constructor(fb: FormBuilder, glossaryService: GlossaryService, glossaryTableComponent: GlossaryTableComponent, @Inject(LOCALE_ID) public locale: string) {
    this.glossaryService = glossaryService;
    this.translationForm = fb.group({
      phrase: ["", Validators.required],
      lang: [this.locale],
      model: ["nmt"]
    });
    this.glossaryTableComponent = glossaryTableComponent;
  }


  ngOnInit() {
  }

  onSubmit() {
    if (this.translationForm.valid) {
      this.glossaryService.createTranslation(<TranslateText>this.translationForm.value);
    } else {
      alert("Errors found! Please check and try again. ")
    }
  }
}


