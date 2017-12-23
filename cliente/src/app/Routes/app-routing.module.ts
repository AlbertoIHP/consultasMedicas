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

  //Componente Alergia
  import { AlergiaComponent } from '../Components/moduloPacientes/alergia/alergia.component';

  //Componente Alergias Comunes Paciente
  import { AlergiasComunesPacienteComponent } from '../Components/moduloPacientes/alergias-comunes-paciente/alergias-comunes-paciente.component';

  //Componente Enfermedad Crónica
  import { EnfermedadCronicaComponent } from '../Components/moduloPacientes/enfermedad-cronica/enfermedad-cronica.component';

  //Componente Enfermedades Crónicas Paciente 
  import { EnfermedadesCronicasPacienteComponent } from '../Components/moduloPacientes/enfermedades-cronicas-paciente/enfermedades-cronicas-paciente.component';

  //Componente Grupo Étnico
  import { GrupoEtnicoComponent } from '../Components/moduloPacientes/grupo-etnico/grupo-etnico.component';

  //Componente Hábito
  import { HabitoComponent } from '../Components/moduloPacientes/habito/habito.component';

  //Componente Hábito Sexual
  import { HabitoSexualComponent } from '../Components/moduloPacientes/habito-sexual/habito-sexual.component';

  //Componente Hábitos Paciente
  import { HabitosPacienteComponent } from '../Components/moduloPacientes/habitos-paciente/habitos-paciente.component';

  //Componente Hábitos Sexuales Paciente
  import { HabitosSexualesPacienteComponent } from '../Components/moduloPacientes/habitos-sexuales-paciente/habitos-sexuales-paciente.component';

  //Componente Ocupación
  import { OcupacionComponent } from '../Components/moduloPacientes/ocupacion/ocupacion.component';

  //Componente Uso Medicamento
  import { UsoMedicamentoComponent } from '../Components/moduloPacientes/uso-medicamento/uso-medicamento.component';

  //Componente Vacuna
  import { VacunaComponent } from '../Components/moduloPacientes/vacuna/vacuna.component';

  //Componente Vacunas Paciente
  import { VacunasPacienteComponent } from '../Components/moduloPacientes/vacunas-paciente/vacunas-paciente.component';





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

  //Componente Feriados
  import { FeriadosComponent } from '../Components/moduloCitas/feriados/feriados.component';



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

  //Componente Exámen Físico
  import { ExamenFisicoComponent } from '../Components/moduloAtenciones/examen-fisico/examen-fisico.component';



//COMPONENTES MOBILE
import { HomemcComponent } from '../Components/moduloCitas/homemc.component';
import { Homemp } from '../Components/moduloPacientes/homemp.component';

import { Homema } from '../Components/moduloAtenciones/homema.component';


//GUARDS
import { LoginGuard } from '../Guards/login.guard';
import { AuthGuard } from '../Guards/auth.guard';
import { InicioGuard } from '../Guards/inicio.guard';

  


const routes: Routes =
[
  //RUTAS MOBILE
  { path: 'mobile/mc',  component: HomemcComponent, canActivate: [AuthGuard],data:{nombre:'libre'}  },
  { path: 'mobile/mp',  component: Homemp, canActivate: [AuthGuard], data:{nombre:'libre'}   },
  { path: 'mobile/ma',  component: Homema, canActivate: [AuthGuard], data:{nombre:'libre'}   },

  { path: 'login',  component: LoginComponent, canActivate: [LoginGuard] },
  { path: '',  component: PersonaComponent, pathMatch: 'full', canActivate: [InicioGuard] },

  //MÓDULO PACIENTES
  { path: 'ts',  component: TiposangreComponent, canActivate: [AuthGuard], data:{nombre:'TipoSangre'} },
  { path: 'pac',  component: PacientesComponent, canActivate: [AuthGuard], data:{nombre:'Pacientes'} },
  { path: 'per',  component: PersonaComponent, canActivate: [AuthGuard], data:{nombre:'Personas'} },
  { path: 'usu',  component: UsuariosComponent, canActivate: [AuthGuard], data:{nombre:'Usuarios'} },
  { path: 'rol',  component: RolesComponent, canActivate: [AuthGuard], data:{nombre:'Roles'} },
  { path: 'reg',  component: RegionesComponent, canActivate: [AuthGuard], data:{nombre:'Regiones'} },
  { path: 'pro',  component: ProvinciasComponent, canActivate: [AuthGuard], data:{nombre:'Provincias'} },
  { path: 'pre',  component: PrevisionesComponent, canActivate: [AuthGuard], data:{nombre:'Previsiones'} },
  { path: 'com',  component: ComunasComponent, canActivate: [AuthGuard], data:{nombre:'Comunas'} },
  { path: 'gen',  component: GenerosComponent, canActivate: [AuthGuard], data:{nombre:'Generos'} },
  { path: 'ec',  component: EstadocivilComponent, canActivate: [AuthGuard], data:{nombre:'EstadoCivil'} },
  { path: 'fm',  component: FichaMedicaComponent, canActivate: [AuthGuard] },

  { path: 'als', component: AlergiaComponent, canActivate: [AuthGuard], data:{nombre:'Alergias'}  },
  { path: 'algc',  component: AlergiasComunesPacienteComponent, canActivate: [AuthGuard], data:{nombre:'AlergiasComunesPaciente'}  },
  { path: 'efc',  component: EnfermedadCronicaComponent, canActivate: [AuthGuard], data:{nombre:'EnfermedadCronica'}  },
  { path: 'efcp',  component: EnfermedadesCronicasPacienteComponent, canActivate: [AuthGuard], data:{nombre:'EnfermedadesCronicasPaciente'}  },
  { path: 'gre',  component: GrupoEtnicoComponent, canActivate: [AuthGuard], data:{nombre:'GrupoEtnico'}  },
  { path: 'ha',  component: HabitoComponent, canActivate: [AuthGuard], data:{nombre:'Habitos'}  },
  { path: 'has',  component: HabitoSexualComponent, canActivate: [AuthGuard], data:{nombre:'HabitoSexual'}  },
  { path: 'hap',  component: HabitosPacienteComponent, canActivate: [AuthGuard], data:{nombre:'HabitosPaciente'}  },
  { path: 'hasp',  component: HabitosSexualesPacienteComponent, canActivate: [AuthGuard], data:{nombre:'HabitosSexualesPaciente'}  },
  { path: 'ocp',  component: OcupacionComponent, canActivate: [AuthGuard], data:{nombre:'Ocupaciones'}  },
  { path: 'ume',  component: UsoMedicamentoComponent, canActivate: [AuthGuard], data:{nombre:'UsoMedicamento'}  },
  { path: 'vac',  component: VacunaComponent, canActivate: [AuthGuard], data:{nombre:'Vacuna'}  },
  { path: 'vacp',  component: VacunasPacienteComponent, canActivate: [AuthGuard], data:{nombre:'VacunasPaciente'}  },

  //MÓDULO CITAS

  { path: 'cit',  component: CitaComponent, canActivate: [AuthGuard], data:{nombre:'Cita'}  },
  { path: 'med',  component: MedicoComponent, canActivate: [AuthGuard], data:{nombre:'Medico'}  },
  { path: 'esp',  component: EspecialidadComponent, canActivate: [AuthGuard], data:{nombre:'Especialidad'}  },
  { path: 'es',  component: EstadocitaComponent, canActivate: [AuthGuard], data:{nombre:'EstadoCita'}  },
  { path: 'bc',  component: BoxconsultaComponent, canActivate: [AuthGuard], data:{nombre:'BoxConsulta'}  },
  { path: 'fer', component: FeriadosComponent, canActivate: [AuthGuard], data:{nombre:'Feriado'} },


  //MÓDULO ATENCIONES
  { path: 'algm', component: AlergiaspacienteComponent, canActivate: [AuthGuard], data:{nombre:'AlergiasMedicamentosPaciente'}  },
  { path: 'atc', component: AtencionComponent, canActivate: [AuthGuard], data:{nombre:'Atencion'}  },
  { path: 'dia', component: DiagnosticoComponent, canActivate: [AuthGuard], data:{nombre:'Diagnostico'}  },
  { path: 'diat', component: DiagnosticosatencionComponent, canActivate: [AuthGuard], data:{nombre:'DiagnosticosAtencion'}  },
  { path: 'mto', component: MedicamentoComponent, canActivate: [AuthGuard], data:{nombre:'Medicamento'}  },
  { path: 'mre', component: MedicamentosrecetaComponent, canActivate: [AuthGuard], data:{nombre:'MedicamentosReceta'}  },
  { path: 'rec', component: RecetaComponent, canActivate: [AuthGuard] , data:{nombre:'Receta'} },
  { path: 'vam', component: ViaadministracionmedicamentoComponent, canActivate: [AuthGuard], data:{nombre:'ViaAdministracionMedicamento'}  },
  { path: 'exf', component: ExamenFisicoComponent, canActivate: [AuthGuard], data:{nombre:'ExamenFisico'}  }

];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

