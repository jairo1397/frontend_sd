import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class ListarAlumnosComponent implements OnInit {
  listAlumnos: Alumno[] = [];

  constructor(private _alumnoService: AlumnoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    this._alumnoService.getAlumnos().subscribe(data => {
      console.log(data);
      this.listAlumnos = data;
      // console.log(JSON.stringify(data));
    }, error => console.log(error));
  }
  eliminarAlumno(id: any) {
    this._alumnoService.eliminarAlumno(id).subscribe(data => {
      this.toastr.error('Alumno eliminado correctamente', 'Alumno eliminado');
      this.obtenerAlumnos();
    }, error => {
      console.log(error);
    });
  }

}
