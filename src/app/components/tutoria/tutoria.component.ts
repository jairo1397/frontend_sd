import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup,Validator,FormControl,FormArray } from '@angular/forms';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { Tutoria } from 'src/app/models/tutoria';
import { AlumnoService } from 'src/app/services/alumno.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Alumno } from 'src/app/models/alumno';
import { TutoriasService } from 'src/app/services/tutorias.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutoria',
  templateUrl: './tutoria.component.html',
  styleUrls: ['./tutoria.component.css']
})
export class TutoriaComponent implements OnInit {
  time = {hour: 13, minute: 30};
  tutoriaForm! : FormGroup;
  model: NgbDateStruct | undefined;  
  cargando: boolean = true;

  listAlumnos: Alumno[] = [];
  listTutorias: Tutoria[] = [];
  mapAlumnos = new Map<string, number>();
  listAlumnosNombre: string[] = [];
  modelfocus: any;
  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.listAlumnosNombre
        : this.listAlumnosNombre.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  constructor(private router: Router,private _alumnoService : AlumnoService,private tutoriasService:TutoriasService, private fb: FormBuilder,private toastr: ToastrService) {    
  }

  ngOnInit(): void {
    
    this.tutoriaForm=this.fb.group({
    enlace: [''],
    nombre: [''],
    id_alumno:[''],
    fecha:[''],
    hora:['']
    });
    this.obtenerAlumnos();
    this.obtenerAlumnos2();
    this.obtenerTutorias();
  }

  agregarTutoria(formValue:any){
    const TUTORIA= new Tutoria();
    console.log(this.mapAlumnos.get(formValue.id_alumno));
    TUTORIA.reunion=formValue.enlace;
    TUTORIA.alumno=this.mapAlumnos.get(formValue.id_alumno)||2;
    TUTORIA.hora=formValue.hora.hour.toString()+" : "+formValue.hora.minute.toString();
    TUTORIA.fecha=formValue.fecha.day.toString() + "/"+formValue.fecha.month.toString() + "/"+ formValue.fecha.year.toString();
    //TUTORIA.fecha=(new Date(formValue.fecha.year,formValue.fecha.month,formValue.fecha.day,formValue.hora.hour,formValue.hora.minute)).toString();
    this.tutoriasService.guardarTutoria(TUTORIA);

    console.log( TUTORIA);
      this.tutoriasService.guardarTutoria(TUTORIA).subscribe(data => {
        this.router.navigate(['/tutoria']);
        this.toastr.success('Tutoria agregado correctamente', 'Tutoria agregado');
        this.tutoriaForm.reset();
      }, error => {
        console.log(error);
        this.tutoriaForm.reset();
    });
  }

  obtenerAlumnos() {    
    this._alumnoService.getAlumnos().subscribe(data => {
      this.listAlumnos= data
    }, error => console.log(error));    
  }
  async obtenerAlumnos2(){
    setTimeout(()=>{
      for (let alum of this.listAlumnos){
        this.listAlumnosNombre.push(alum.nombre + " "+alum.apellido);
        this.mapAlumnos.set(alum.nombre + " "+alum.apellido,alum.id||2);
      }
    },1000);
  }
  obtenerTutorias() {    
    this.tutoriasService.getTutorias().subscribe(data => {
      console.log("gaaaaaaaaaaaaaaaaa");
      console.log(data);
      this.listTutorias= data
    }, error => console.log(error));    
  }
  nombreAlumno(id_alumno:number): string {
    let nombre:string;
    nombre="";
    this.listAlumnos.forEach(object =>{
      if(object.id == id_alumno){
          nombre= (object.nombre+object.apellido);
      }
  });

    return nombre;
  }
}
