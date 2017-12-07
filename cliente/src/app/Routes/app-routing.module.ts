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



  //Componente Alergias Paciente
  import { AlergiaspacienteComponent } from '../Components/moduloAtenciones/alergiasmedicamentospaciente/alergiaspaciente.component';

  //Componente Atención
  import { AtencionComponent } from '../Components/moduloAtenciones/atencion/atencion.component';
  
  //Componente Diagnóstico
  import { DiagnosticoComponent } from '../Components/moduloAtenciones/diagnostico/diagnostico.component';
  
  //Componente Diagnoóticos Atención
  import { DiagnosticosatencionComponent } from '../Components/moduloAtenciones/diagnosticosatencion/diagnosticosatencion.component';
  
  //Componente Medicamento
  import { MedicamentoComponent } from '../Components/moduloAtenciones/medicamento/medicamento.component';
  
  //Componente Medicamentos Receta
  import { MedicamentosrecetaComponent } from '../Components/moduloAtenciones/medicamentosreceta/medicamentosreceta.component';
  
  //Componente Receta
  import { RecetaComponent } from '../Components/moduloAtenciones/receta/receta.component';
  
  //Componente Vía Administración Medicamento
  import { ViaadministracionmedicamentoComponent } from '../Components/moduloAtenciones/viaadministracionmedicamento/viaadministracionmedicamento.component';

//COMPONENTES MOBILE
import { HomemcComponent } from '../Components/moduloCitas/homemc.component';
import { Homemp } from '../Components/moduloPacientes/homemp.component';

import { Homema } from '../Components/moduloAtenciones/homema.component';


const routes: Routes =
[
  //RUTAS MOBILE
  { path: 'mobile/mc',  component: HomemcComponent },
  { path: 'mobile/mp',  component: Homemp },
  { path: 'mobile/ma',  component: Homema },

  { path: 'login',  component: LoginComponent },
  { path: '',  component: PersonaComponent, pathMatch: 'full' },

  //MÓDULO PACIENTES
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

  //MÓDULO CITAS

  { path: 'cit',  component: CitaComponent },
  { path: 'med',  component: MedicoComponent },
  { path: 'esp',  component: EspecialidadComponent },
  { path: 'es',  component: EstadocitaComponent },
  { path: 'bc',  component: BoxconsultaComponent },


  //MÓDULO ATENCIONES
  { path: 'alg', component: AlergiaspacienteComponent },
  { path: 'atc', component: AtencionComponent },
  { path: 'dia', component: DiagnosticoComponent },
  { path: 'diat', component: DiagnosticosatencionComponent },
  { path: 'mto', component: MedicamentoComponent },
  { path: 'mre', component: MedicamentosrecetaComponent },
  { path: 'rec', component: RecetaComponent },
  { path: 'vam', component: ViaadministracionmedicamentoComponent }

];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

