import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcuerdosService {
  url = 'https://us-central1-crud-53510.cloudfunctions.net/app/api/acuerdos/';

  constructor(private http: HttpClient) { }
  getAcuerdos(): Observable<any> {
    return this.http.get(this.url);
  }
}
