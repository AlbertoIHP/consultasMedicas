import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../Components/login/login.component'


  //Componente Regiones
  import { RegionesComponent } from '../Components/moduloPacientes/regiones/regiones.component';


  //Componente Roles
  import { RolesComponent } from '../Components/moduloPacientes/roles/roles.component';


  //Componente Usuario
  import { UsuariosComponent } from '../Components/moduloPacientes/usuarios/usuarios.component';


  //Componente Persona
  import { PersonaComponent } from '../Components/moduloPacientes/personas/personas.component';


  //Componente Pacientes
  import { PacientesComponent } from '../Components/moduloPacientes/pacientes/pacientes.component';


  //Componente Tipo Sangre
  import { TiposangreComponent } from '../Components/moduloPacientes/tiposangre/tiposangre.component';

  //Componente Ficha Medica
  import { FichaMedicaComponent } from '../Components/moduloPacientes/fichamedica/fichamedica.component';

  //Componente Estado Civil
  import { EstadocivilComponent } from '../Components/moduloPacientes/estadocivil/estadocivil.component';

  //Componente Generos
  import { GenerosComponent } from '../Components/moduloPacientes/generos/generos.component';

  //Componente Comunas
  import { ComunasComponent } from '../Components/moduloPacientes/comunas/comunas.component';


  //Componente Previsiones
  import { PrevisionesComponent } from '../Components/moduloPacientes/previsiones/previsiones.component';

  //Componente Provincias
  import { ProvinciasComponent } from '../Components/moduloPacientes/provincias/provincias.component';






  //Componente Box Consulta
  import { BoxconsultaComponent } from '../Components/moduloCitas/boxconsulta/boxconsulta.component';

  //Componente Estado Cita
  import { EstadocitaComponent } from '../Components/moduloCitas/estadocita/estadocita.component';

  //Componente Especialidad
  import { EspecialidadComponent } from '../Components/moduloCitas/especialidad/especialidad.component';

  //Componente Medico
  import { MedicoComponent } from '../Components/moduloCitas/medico/medico.component';

  //Componente Cita
  import { CitaComponent } from '../Components/moduloCitas/cita/cita.component';



const routes: Routes =
[
  { path: 'login',  component: LoginComponent },
  { path: '',  component: PersonaComponent },

  //MODULO PACIENTES
  { path: 'ts',  component: TiposangreComponent },
  { path: 'pac',  component: PacientesComponent },
  { path: 'per',  component: PersonaComponent },
  { path: 'usu',  component: UsuariosComponent },
  { path: 'rol',  component: RolesComponent },
  { path: 'reg',  component: RegionesComponent },
  { path: 'pro',  component: ProvinciasComponent },
  { path: 'pre',  component: PrevisionesComponent },
  { path: 'com',  component: ComunasComponent },
  { path: 'gen',  component: GenerosComponent },
  { path: 'ec',  component: EstadocivilComponent },
  { path: 'fm',  component: FichaMedicaComponent },

  //MODULO CITAS

  { path: 'cit',  component: CitaComponent },
  { path: 'med',  component: MedicoComponent },
  { path: 'esp',  component: EspecialidadComponent },
  { path: 'es',  component: EstadocitaComponent },
  { path: 'bc',  component: BoxconsultaComponent }







];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

