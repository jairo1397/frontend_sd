import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { Error404Component } from './components/error404/error404.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListarAlumnosComponent } from './components/listar-alumnos/listar-alumnos.component';
import { LoginComponent } from './components/login/login.component';
import { ReunionComponent } from './components/reunion/reunion.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TutoriaComponent } from './components/tutoria/tutoria.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'listar-alumnos', component: ListarAlumnosComponent },
  { path: 'agregar-alumno', component: AgregarAlumnoComponent },
  { path: 'editar-alumno/:id', component: AgregarAlumnoComponent },
  { path: 'detalles-alumno/:id', component: DetallesComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'tutoria', component: TutoriaComponent },
  { path: 'reunion', component: ReunionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
