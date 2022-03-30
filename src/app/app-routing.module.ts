import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { ListarAlumnosComponent } from './components/listar-alumnos/listar-alumnos.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: ListarAlumnosComponent },
  { path: 'listar-alumnos', component: ListarAlumnosComponent },
  { path: 'agregar-alumno', component: AgregarAlumnoComponent },
  { path: 'editar-alumno/:id', component: AgregarAlumnoComponent },

  { path: 'sidebar', component: SidebarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
