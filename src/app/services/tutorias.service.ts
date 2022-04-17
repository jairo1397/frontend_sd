import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutoria } from '../models/tutoria';

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {
  url = 'https://us-central1-crud-53510.cloudfunctions.net/app/api/tutorias/';

  constructor(private http: HttpClient) { }
  getTutorias(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarTutoria(tutoria: Tutoria): Observable<any> {
    console.log(tutoria);
    console.log("holaaaaaaaaa");
    return this.http.post(this.url, tutoria);
  }
  obtenerTutoria(id: string): Observable<any> {
    console.log("sssssssssssssss");
    return this.http.get(this.url + id);
  }
}
