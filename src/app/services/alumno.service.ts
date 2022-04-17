import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  url = 'https://us-central1-crud-53510.cloudfunctions.net/app/api/alumnos/';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    return this.http.get(this.url);
  }
  eliminarAlumno(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
  guardarAlumno(alumno: Alumno): Observable<any> {
    console.log(alumno);
    return this.http.post(this.url, alumno);
  }
  obtenerAlumno(id: string): Observable<any> {
    console.log("sssssssssssssss");
    return this.http.get(this.url + id);
  }
  editarAlumno(id: string, alumno: Alumno): Observable<any> {
    return this.http.put(this.url + id, alumno);
  }

}
