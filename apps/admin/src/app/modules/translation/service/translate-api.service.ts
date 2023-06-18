import {Injectable, OnInit} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {TranslateText} from "./translate-text.TranslateText";


@Injectable({
  providedIn: 'root'
})
export class TranslateApiService implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  public translateText(textToTranslate: TranslateText): Observable<string> {
    var observable = new Observable<string>(observer =>
      this.httpClient.post("https://translation.googleapis.com/language/translate/v2?key="
        + environment.firebase.apiKey, textToTranslate).subscribe((data: any) => observer.next(data.data.translations[0].translatedText)));
    return observable;
  }
}

