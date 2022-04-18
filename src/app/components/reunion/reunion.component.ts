import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Alumno } from 'src/app/models/alumno';
import { Tutoria } from 'src/app/models/tutoria';
import { AlumnoService } from 'src/app/services/alumno.service';
import { TutoriasService } from 'src/app/services/tutorias.service';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { AcuerdosService } from 'src/app/services/acuerdos.service';
import { Acuerdos } from 'src/app/models/acuerdos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  alumno :Alumno=new Alumno("","",0,"",0);
  tutoria:Tutoria=new Tutoria();
  id_alumno: string="";
  reunionForm! : FormGroup;

  modelfocus: any;
  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  listAcuerdosNombre: string[] = [];
  listAcuerdos: Acuerdos[] = [];
  id_tuto:string="";
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.listAcuerdosNombre
        : this.listAcuerdosNombre.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }


  constructor(private router: Router,private toastr: ToastrService,private acuerdosService: AcuerdosService,private route:ActivatedRoute, private fb: FormBuilder,private alumnoService: AlumnoService,private tutoriaService:TutoriasService) {
    
  }

  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.id_tuto=id!;
    this.obtenerTutoria(id!);     
    this.obtenerAcuerdos();  
    this.obtenerAcuerdosDescripcion() 
    this.reunionForm=this.fb.group({
      enlace: [''],
      acuerdo: ['']
      });
  }
  agregarAcuerdo(formValue:any){
    this.tutoria.acuerdos=formValue.acuerdo;
    this.tutoria.grabacion=formValue.enlace;
    console.log(formValue.enlace);
    //TUTORIA.fecha=(new Date(formValue.fecha.year,formValue.fecha.month,formValue.fecha.day,formValue.hora.hour,formValue.hora.minute)).toString();

    console.log( this.tutoria);
      this.tutoriaService.guardarAcuerdo(this.id_tuto,this.tutoria).subscribe(data => {
        this.router.navigate(['/tutoria']);
        this.toastr.success('Acuerdo agregado correctamente', 'Acuerdo agregado');
        this.reunionForm.reset();
      }, error => {
        console.log(error);
        this.reunionForm.reset();
    });
  }
  obtenerAlumno(id:string) {
      console.log(id);
      this.alumnoService.obtenerAlumno(id).subscribe(data => {
        console.log(data);
        this.alumno=data.alumno;
        console.log(this.alumno);
      });
    }
  async obtenerTutoria(id:string) {

      this.tutoriaService.obtenerTutoria(id).subscribe(data => {
        console.log(data);
        this.tutoria=data.tutoria;        
        this.obtenerAlumno(this.tutoria.alumno.toString());      
        
      });
  }

  obtenerAcuerdos() {    
    this.acuerdosService.getAcuerdos().subscribe(data => {
      console.log(data)
      this.listAcuerdos=data;
    }, error => console.log(error));    
  }
  async obtenerAcuerdosDescripcion(){
    setTimeout(()=>{
      for (let acuerdo of this.listAcuerdos){
        this.listAcuerdosNombre.push(acuerdo.descripcion);
      }

      this.reunionForm.setValue({
        enlace: this.tutoria.grabacion,
        acuerdo: this.tutoria.acuerdos,
      });
    },1000);
  }
}
