import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {

  url = 'https://us-central1-crud-53510.cloudfunctions.net/app/api/tutores/';

  constructor(private http: HttpClient) { }
  getTutores(): Observable<any> {
    return this.http.get(this.url);
  }
}
