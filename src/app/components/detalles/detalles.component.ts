import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  alumnoNombre: any;
  alumnoId: any;
  alumnoApellido: any;
  alumnoEdad: any;
  alumnoGenero: any;
  alumnoCursos: any;
  constructor(private ruta: ActivatedRoute, private _alumnoService: AlumnoService) { }


  ngOnInit(): void {
    this.alumnoId = this.ruta.snapshot.paramMap.get('id');
    this.detallesAlumno();
  }
  detallesAlumno() {
    this._alumnoService.obtenerAlumno(this.alumnoId).subscribe(data => {
      console.log(data);
      this.alumnoNombre = data.alumno.nombre;
      this.alumnoApellido = data.alumno.apellido;
      this.alumnoEdad = data.alumno.edad;
      this.alumnoGenero = data.alumno.genero;
      this.alumnoCursos = data.alumno.cursos;
      // console.log(this.alumnoCursos);
      // console.log(JSON.stringify(data));
    });

  }

}
