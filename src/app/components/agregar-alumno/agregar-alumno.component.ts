import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;
  titulo = 'Agregar Alumno';
  id: string | null;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _alumnoService: AlumnoService, private aRouter: ActivatedRoute) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      promedio_pond: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarAlumno() {
    // console.log(this.alumnoForm);

    const ALUMNO: Alumno = {
      nombre: this.alumnoForm.get('nombre')?.value,
      apellido: this.alumnoForm.get('apellido')?.value,
      edad: this.alumnoForm.get('edad')?.value,
      genero: this.alumnoForm.get('genero')?.value,
      promedio_pond: this.alumnoForm.get('promedio_pond')?.value,
    }
    if (this.id !== null) {
      this._alumnoService.editarAlumno(this.id, ALUMNO).subscribe(data => {

        this.toastr.info('Alumno editado correctamente', 'Alumno editado');
        this.router.navigate(['/listar-alumnos']);
      }, error => {
        console.log(error);
      });

    } else {
      console.log(ALUMNO);
      this._alumnoService.guardarAlumno(ALUMNO).subscribe(data => {
        this.toastr.success('Alumno agregado correctamente', 'Alumno agregado');
        this.router.navigate(['/listar-alumnos']);
      }, error => {
        console.log(error);
        this.alumnoForm.reset();
      });
    }


  }
  esEditar() {
    if (this.id !== null) {
      this.titulo = "Editar Alumno";
      // console.log(this.id);
      this._alumnoService.obtenerAlumno(this.id).subscribe(data => {
        // console.log("hola2")
        // console.log(data);
        // console.log("hola2")
        this.alumnoForm.setValue({
          nombre: data.alumno.nombre,
          apellido: data.alumno.apellido,
          edad: data.alumno.edad,
          genero: data.alumno.genero,
          promedio_pond: data.alumno.promedio_pond,
        });
      });

    }
  }

}
