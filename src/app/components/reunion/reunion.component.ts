import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Tutoria } from 'src/app/models/tutoria';
import { AlumnoService } from 'src/app/services/alumno.service';
import { TutoriasService } from 'src/app/services/tutorias.service';

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
  constructor(private route:ActivatedRoute, private fb: FormBuilder,private alumnoService: AlumnoService,private tutoriaService:TutoriasService) {
    
  }

  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.obtenerReunion(id!);        
    this.reunionForm=this.fb.group({
      enlace: [''],
      acuerdo: ['']
      });
  }
  agregarAcuerdo(formValue:any){
    console.log(formValue.enlace);
  }
  obtenerAlumno(id:string) {
      console.log(id);
      this.alumnoService.obtenerAlumno(id).subscribe(data => {
        console.log(data);
        this.alumno=data;
      });
    }
  async obtenerReunion(id:string) {
      this.tutoriaService.obtenerTutoria(id).subscribe(data => {
        this.tutoria=data;
        setTimeout(()=>{
          console.log(this.tutoria);
          setTimeout(()=>{
            console.log(this.tutoria.alumno);  
          },1000);
          //this.obtenerAlumno(id_a);
        },1000);        
        console.log(data);
      });
  }
}
