

import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { NgDatepickerModule } from 'ng2-datepicker';

//GUARDS
import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';
import { InicioGuard } from './Guards/inicio.guard';


//SERVICIOS
import { ComunaService } from './Services/comuna/comuna.service';
import { EstadocivilService } from './Services/estadocivil/estadocivil.service';
import { GeneroService } from './Services/genero/genero.service';
import { PersonaService } from './Services/persona/persona.service';
import { PacienteService } from './Services/paciente/paciente.service';
import { PrevisionService } from './Services/prevision/prevision.service';
import { PrevisionactualService } from './Services/previsionactual/previsionactual.service';
import { ProvinciaService } from './Services/provincia/provincia.service';
import { RegionService } from './Services/region/region.service';
import { RoleService } from './Services/role/role.service';
import { UserService } from './Services/user/user.service';
import { TipoSangreService } from './Services/tiposangre/tiposangre.service';
import { AuthenticationService} from './Services/authentication/authentication.service';
import { EventosService } from './Services/eventos/eventos.service';
import { ModuloService } from './Services/modulo/modulo.service';
import { PermisoModuloService } from './Services/permisomodulo/permisomodulo.service';

import { VacunaService } from './Services/vacuna/vacuna.service';
import { VacunasPacienteService } from './Services/vacunaspaciente/vacunaspaciente.service';
import { HabitosSexualesPacienteService } from './Services/habitossexualespaciente/habitos-sexuales-paciente.service';
import { HabitoSexualService } from './Services/habitosexual/habito-sexual.service';
import { HabitosPacienteService } from './Services/habitospaciente/habitos-paciente.service';
import { HabitoService } from './Services/habito/habito.service';
import { EnfermedadCronicaService } from './Services/enfermedadcronica/enfermedad-cronica.service';
import { EnfermedadesCronicasPacienteService } from './Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';
import { OcupacionService } from './Services/ocupacion/ocupacion.service';
import { GrupoEtnicoService } from './Services/grupoetnico/grupo-etnico.service';
import { UsoMedicamentoService } from './Services/usomedicamento/uso-medicamento.service';
import { AlergiaService } from './Services/alergia/alergia.service';
import { AlergiasComunesPacienteService } from './Services/alergiascomunespaciente/alergias-comunes-paciente.service';


// SERVICIOS MODULO CITAS
import { BoxConsultaService } from './Services/boxconsulta/box-consulta.service';
import { CitaService } from './Services/cita/cita.service';
import { EspecialidadService } from './Services/especialidad/especialidad.service';
import { EstadoCitaService } from './Services/estadocita/estado-cita.service';
import { MedicoService } from './Services/medico/medico.service';
import { TipoBoxService } from './Services/tipobox/tipo-box.service';
import { DisponibilidadService } from './Services/disponibilidad/disponibilidad.service';

//SERVICIOS MODULO ATENCIONES
import { AtencionService } from './Services/atencion/atencion.service';
import { DiagnosticoService } from './Services/diagnostico/diagnostico.service';
import { DiagnosticosAtencionService } from './Services/diagnosticosatencion/diagnosticos-atencion.service';
import { ViaAdministracionMedicamentoService } from './Services/viaAdministracionMedicamento/via-administracion-medicamento.service';
import { MedicamentoService } from './Services/medicamento/medicamento.service';
import { RecetaService } from './Services/receta/receta.service';
import { MedicamentosRecetaService } from './Services/medicamentosReceta/medicamentos-receta.service';
import { AlergiasMedicamentosPacienteService } from './Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';
import { ExamenFisicoService } from './Services/examenfisico/examen-fisico.service';

//MODULOS
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Routes/app-routing.module';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


// COMPONENTES

//Componentes Raices
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';

//Modulo Pacientes
import { Homemp } from './Components/moduloPacientes/homemp.component';
import { Homema } from './Components/moduloAtenciones/homema.component';

  //Componente Ficha Medica
  import { VerFichaMedicaComponent } from './Components/moduloPacientes/fichamedica/verfichamedica/verfichamedica.component';
  import { FichaMedicaComponent } from './Components/moduloPacientes/fichamedica/fichamedica.component';
  //Componente Estado Civil
  import { EstadocivilComponent } from './Components/moduloPacientes/estadocivil/estadocivil.component';
  import { EditarEstadoCComponent } from './Components/moduloPacientes/estadocivil/editar-estado-c/editar-estado-c.component';
  import { AgregarEstadoCComponent } from './Components/moduloPacientes/estadocivil/agregar-estado-c/agregar-estado-c.component';

  //Componente Generos
  import { GenerosComponent } from './Components/moduloPacientes/generos/generos.component';
  import { EditargeneroComponent } from './Components/moduloPacientes/generos/editargenero/editargenero.component';
  import { AgregargeneroComponent } from './Components/moduloPacientes/generos/agregargenero/agregargenero.component';

  //Componente Comunas
  import { ComunasComponent } from './Components/moduloPacientes/comunas/comunas.component';
  import { AgregarcomunaComponent } from './Components/moduloPacientes/comunas/agregarcomuna/agregarcomuna.component';
  import { EditarcomunaComponent } from './Components/moduloPacientes/comunas/editarcomuna/editarcomuna.component';

  //Componente Previsiones
  import { PrevisionesComponent } from './Components/moduloPacientes/previsiones/previsiones.component';
  import { EditarprevisionComponent } from './Components/moduloPacientes/previsiones/editarprevision/editarprevision.component';
  import { AgregarprevisionComponent } from './Components/moduloPacientes/previsiones/agregarprevision/agregarprevision.component';
  import { VerPrevisionComponent } from './Components/moduloPacientes/previsiones/verprevision/verprevision.component';

  //Componente Provincias
  import { ProvinciasComponent } from './Components/moduloPacientes/provincias/provincias.component';
  import { AgregarprovinciaComponent } from './Components/moduloPacientes/provincias/agregarprovincia/agregarprovincia.component';
  import { EditarprovinciaComponent } from './Components/moduloPacientes/provincias/editarprovincia/editarprovincia.component';

  //Componente Regiones
  import { RegionesComponent } from './Components/moduloPacientes/regiones/regiones.component';
  import { EditarregionesComponent } from './Components/moduloPacientes/regiones/editarregiones/editarregiones.component';
  import { AgregarregionesComponent } from './Components/moduloPacientes/regiones/agregarregiones/agregarregiones.component';

  //Componente Roles
  import { RolesComponent } from './Components/moduloPacientes/roles/roles.component';
  import { AgregarrolesComponent } from './Components/moduloPacientes/roles/agregarroles/agregarroles.component';
  import { EditarrolesComponent } from './Components/moduloPacientes/roles/editarroles/editarroles.component';

  //Componente Usuario
  import { UsuariosComponent } from './Components/moduloPacientes/usuarios/usuarios.component';
  import { EditarusuarioComponent } from './Components/moduloPacientes/usuarios/editarusuario/editarusuario.component';
  import { AgregarusuarioComponent } from './Components/moduloPacientes/usuarios/agregarusuario/agregarusuario.component';

  //Componente Persona
  import { PersonaComponent } from './Components/moduloPacientes/personas/personas.component';
  import { VerpersonaComponent } from './Components/moduloPacientes/personas/verpersona/verpersona.component';
  import { AgregarpersonaComponent } from './Components/moduloPacientes/personas/agregarpersona/agregarpersona.component';
  import { EditarpersonaComponent } from './Components/moduloPacientes/personas/editarpersona/editarpersona.component';

  //Componente Pacientes
  import { PacientesComponent } from './Components/moduloPacientes/pacientes/pacientes.component';
  import { EditarpacienteComponent } from './Components/moduloPacientes/pacientes/editarpaciente/editarpaciente.component';
  import { AgregarpacienteComponent } from './Components/moduloPacientes/pacientes/agregarpaciente/agregarpaciente.component';

  //Componente Tipo Sangre
  import { TiposangreComponent } from './Components/moduloPacientes/tiposangre/tiposangre.component';
  import { AgregartipoComponent } from './Components/moduloPacientes/tiposangre/agregartipo/agregartipo.component';
  import { EditartipoComponent } from './Components/moduloPacientes/tiposangre/editartipo/editartipo.component';
  import { RegistroComponent } from './Components/login/registro/registro.component';

 //Modulo Citas
import { HomemcComponent } from './Components/moduloCitas/homemc.component';

  //Componente Box Consulta
  import { BoxconsultaComponent } from './Components/moduloCitas/boxconsulta/boxconsulta.component';
  import { AgregarboxconsultaComponent } from './Components/moduloCitas/boxconsulta/agregarboxconsulta/agregarboxconsulta.component';
  import { EditarboxconsultaComponent } from './Components/moduloCitas/boxconsulta/editarboxconsulta/editarboxconsulta.component';

  //Componente Estado Cita
  import { EstadocitaComponent } from './Components/moduloCitas/estadocita/estadocita.component';
  import { AgregarestadocitaComponent } from './Components/moduloCitas/estadocita/agregarestadocita/agregarestadocita.component';
  import { EditarestadocitaComponent } from './Components/moduloCitas/estadocita/editarestadocita/editarestadocita.component';

  //Componente Especialidad
  import { EspecialidadComponent } from './Components/moduloCitas/especialidad/especialidad.component';
  import { AgregarespecialidadComponent } from './Components/moduloCitas/especialidad/agregarespecialidad/agregarespecialidad.component';
  import { EditarespecialidadComponent } from './Components/moduloCitas/especialidad/editarespecialidad/editarespecialidad.component';

  //Componente Medico
  import { MedicoComponent } from './Components/moduloCitas/medico/medico.component';
  import { AgregarmedicoComponent } from './Components/moduloCitas/medico/agregarmedico/agregarmedico.component';
  import { EditarmedicoComponent } from './Components/moduloCitas/medico/editarmedico/editarmedico.component';
  import { DisponibilidadComponent } from './Components/moduloCitas/medico/disponibilidad/disponibilidad.component';

  //Componente Cita
  import { CalendarHeaderComponent } from './Components/moduloCitas/cita/header.component';
  import { CitaComponent } from './Components/moduloCitas/cita/cita.component';
  import { AgregarcitaComponent } from './Components/moduloCitas/cita/agregarcita/agregarcita.component';
  import { EditarcitaComponent } from './Components/moduloCitas/cita/editarcita/editarcita.component';
  import { VercitaComponent } from './Components/moduloCitas/cita/vercita/vercita.component';
  import { MensajeErrorComponent } from './Components/Globals/mensaje-error/mensaje-error.component';


  //Módulo Atenciones
  import { AtencionComponent } from './Components/moduloAtenciones/atencion/atencion.component';
  import { AgregarAtencionComponent } from './Components/moduloAtenciones/atencion/agregar-atencion/agregar-atencion.component';
  import { EditarAtencionComponent } from './Components/moduloAtenciones/atencion/editar-atencion/editar-atencion.component';

  import { DiagnosticoComponent } from './Components/moduloAtenciones/diagnostico/diagnostico.component';
  import { AgregarDiagnosticoComponent } from './Components/moduloAtenciones/diagnostico/agregar-diagnostico/agregar-diagnostico.component';
  import { EditarDiagnosticoComponent } from './Components/moduloAtenciones/diagnostico/editar-diagnostico/editar-diagnostico.component';

  import { RecetaComponent } from './Components/moduloAtenciones/receta/receta.component';
  import { AgregarRecetaComponent } from './Components/moduloAtenciones/receta/agregar-receta/agregar-receta.component';
  import { EditarRecetaComponent } from './Components/moduloAtenciones/receta/editar-receta/editar-receta.component';

  import { MedicamentoComponent } from './Components/moduloAtenciones/medicamento/medicamento.component';
  import { AgregarMedicamentoComponent } from './Components/moduloAtenciones/medicamento/agregar-medicamento/agregar-medicamento.component';
  import { EditarMedicamentoComponent } from './Components/moduloAtenciones/medicamento/editar-medicamento/editar-medicamento.component';

  import { DiagnosticosatencionComponent } from './Components/moduloAtenciones/diagnosticosatencion/diagnosticosatencion.component';
  import { AgregarDiagnosticosAtencionComponent } from './Components/moduloAtenciones/diagnosticosatencion/agregar-diagnosticos-atencion/agregar-diagnosticos-atencion.component';
  import { EditarDiagnosticosAtencionComponent } from './Components/moduloAtenciones/diagnosticosatencion/editar-diagnosticos-atencion/editar-diagnosticos-atencion.component';

  import { ViaadministracionmedicamentoComponent } from './Components/moduloAtenciones/viaadministracionmedicamento/viaadministracionmedicamento.component';
  import { AgregarViaAdministracionMedicamentoComponent } from './Components/moduloAtenciones/viaadministracionmedicamento/agregar-via-administracion-medicamento/agregar-via-administracion-medicamento.component';
  import { EditarViaAdministracionMedicamentoComponent } from './Components/moduloAtenciones/viaadministracionmedicamento/editar-via-administracion-medicamento/editar-via-administracion-medicamento.component';

  import { MedicamentosrecetaComponent } from './Components/moduloAtenciones/medicamentosreceta/medicamentosreceta.component';
  import { AgregarMedicamentosRecetaComponent } from './Components/moduloAtenciones/medicamentosreceta/agregar-medicamentos-receta/agregar-medicamentos-receta.component';
  import { EditarMedicamentosRecetaComponent } from './Components/moduloAtenciones/medicamentosreceta/editar-medicamentos-receta/editar-medicamentos-receta.component';

  import { AlergiaspacienteComponent } from './Components/moduloAtenciones/alergiasmedicamentospaciente/alergiaspaciente.component';
  import { AgregarAlergiasPacienteComponent } from './Components/moduloAtenciones/alergiasmedicamentospaciente/agregar-alergias-paciente/agregar-alergias-paciente.component';
  import { EditarAlergiasPacienteComponent } from './Components/moduloAtenciones/alergiasmedicamentospaciente/editar-alergias-paciente/editar-alergias-paciente.component';


  import { VacunaComponent } from './Components/moduloPacientes/vacuna/vacuna.component';
  import { VacunasPacienteComponent } from './Components/moduloPacientes/vacunas-paciente/vacunas-paciente.component';
  import { HabitoSexualComponent } from './Components/moduloPacientes/habito-sexual/habito-sexual.component';
  import { HabitosPacienteComponent } from './Components/moduloPacientes/habitos-paciente/habitos-paciente.component';
  import { HabitoComponent } from './Components/moduloPacientes/habito/habito.component';
  import { EnfermedadesCronicasPacienteComponent } from './Components/moduloPacientes/enfermedades-cronicas-paciente/enfermedades-cronicas-paciente.component';
  import { EnfermedadCronicaComponent } from './Components/moduloPacientes/enfermedad-cronica/enfermedad-cronica.component';
  import { OcupacionComponent } from './Components/moduloPacientes/ocupacion/ocupacion.component';
  import { AlergiasComunesPacienteComponent } from './Components/moduloPacientes/alergias-comunes-paciente/alergias-comunes-paciente.component';
  import { AlergiaComponent } from './Components/moduloPacientes/alergia/alergia.component';
  import { GrupoEtnicoComponent } from './Components/moduloPacientes/grupo-etnico/grupo-etnico.component';
  import { UsoMedicamentoComponent } from './Components/moduloPacientes/uso-medicamento/uso-medicamento.component';
  import { AgregarAlergiaComponent } from './Components/moduloPacientes/alergia/agregar-alergia/agregar-alergia.component';
  import { EditarAlergiaComponent } from './Components/moduloPacientes/alergia/editar-alergia/editar-alergia.component';
  import { AgregarAlergiasComunesPacienteComponent } from './Components/moduloPacientes/alergias-comunes-paciente/agregar-alergias-comunes-paciente/agregar-alergias-comunes-paciente.component';
  import { EditarAlergiasComunesPacienteComponent } from './Components/moduloPacientes/alergias-comunes-paciente/editar-alergias-comunes-paciente/editar-alergias-comunes-paciente.component';
  import { AgregarEnfermedadCronicaComponent } from './Components/moduloPacientes/enfermedad-cronica/agregar-enfermedad-cronica/agregar-enfermedad-cronica.component';
  import { EditarEnfermedadCronicaComponent } from './Components/moduloPacientes/enfermedad-cronica/editar-enfermedad-cronica/editar-enfermedad-cronica.component';
  import { AgregarEnfermedadesCronicasPacienteComponent } from './Components/moduloPacientes/enfermedades-cronicas-paciente/agregar-enfermedades-cronicas-paciente/agregar-enfermedades-cronicas-paciente.component';
  import { EditarEnfermedadesCronicasPacienteComponent } from './Components/moduloPacientes/enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente.component';
  import { AgregarGrupoEtnicoComponent } from './Components/moduloPacientes/grupo-etnico/agregar-grupo-etnico/agregar-grupo-etnico.component';
  import { EditarGrupoEtnicoComponent } from './Components/moduloPacientes/grupo-etnico/editar-grupo-etnico/editar-grupo-etnico.component';
  import { AgregarHabitoComponent } from './Components/moduloPacientes/habito/agregar-habito/agregar-habito.component';
  import { EditarHabitoComponent } from './Components/moduloPacientes/habito/editar-habito/editar-habito.component';
  import { AgregarHabitoSexualComponent } from './Components/moduloPacientes/habito-sexual/agregar-habito-sexual/agregar-habito-sexual.component';
  import { EditarHabitoSexualComponent } from './Components/moduloPacientes/habito-sexual/editar-habito-sexual/editar-habito-sexual.component';
  import { AgregarHabitosPacienteComponent } from './Components/moduloPacientes/habitos-paciente/agregar-habitos-paciente/agregar-habitos-paciente.component';
  import { EditarHabitosPacienteComponent } from './Components/moduloPacientes/habitos-paciente/editar-habitos-paciente/editar-habitos-paciente.component';
  import { HabitosSexualesPacienteComponent } from './Components/moduloPacientes/habitos-sexuales-paciente/habitos-sexuales-paciente.component';
  import { AgregarHabitosSexualesPacienteComponent } from './Components/moduloPacientes/habitos-sexuales-paciente/agregar-habitos-sexuales-paciente/agregar-habitos-sexuales-paciente.component';
  import { EditarHabitosSexualesPacienteComponent } from './Components/moduloPacientes/habitos-sexuales-paciente/editar-habitos-sexuales-paciente/editar-habitos-sexuales-paciente.component';
  import { AgregarOcupacionComponent } from './Components/moduloPacientes/ocupacion/agregar-ocupacion/agregar-ocupacion.component';
  import { EditarOcupacionComponent } from './Components/moduloPacientes/ocupacion/editar-ocupacion/editar-ocupacion.component';
  import { AgregarUsoMedicamentoComponent } from './Components/moduloPacientes/uso-medicamento/agregar-uso-medicamento/agregar-uso-medicamento.component';
  import { EditarUsoMedicamentoComponent } from './Components/moduloPacientes/uso-medicamento/editar-uso-medicamento/editar-uso-medicamento.component';
  import { AgregarVacunaComponent } from './Components/moduloPacientes/vacuna/agregar-vacuna/agregar-vacuna.component';
  import { EditarVacunaComponent } from './Components/moduloPacientes/vacuna/editar-vacuna/editar-vacuna.component';
  import { AgregarVacunasPacienteComponent } from './Components/moduloPacientes/vacunas-paciente/agregar-vacunas-paciente/agregar-vacunas-paciente.component';
  import { EditarVacunasPacienteComponent } from './Components/moduloPacientes/vacunas-paciente/editar-vacunas-paciente/editar-vacunas-paciente.component';
  import { ExamenFisicoComponent } from './Components/moduloAtenciones/examen-fisico/examen-fisico.component';
  import { AgregarExamenFisicoComponent } from './Components/moduloAtenciones/examen-fisico/agregar-examen-fisico/agregar-examen-fisico.component';
  import { EditarExamenFisicoComponent } from './Components/moduloAtenciones/examen-fisico/editar-examen-fisico/editar-examen-fisico.component';
  import { FichaAtencionComponent } from './Components/moduloAtenciones/ficha-atencion/ficha-atencion.component';

  import { VerAlergiasComunesPacienteComponent } from './Components/moduloPacientes/fichamedica/ver-alergias-comunes-paciente/ver-alergias-comunes-paciente.component';


import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { VerEnfermedadesCronicasPacienteComponent } from './Components/moduloPacientes/fichamedica/ver-enfermedades-cronicas-paciente/ver-enfermedades-cronicas-paciente.component';
import { VerHabitosPacienteComponent } from './Components/moduloPacientes/fichamedica/ver-habitos-paciente/ver-habitos-paciente.component';
import { VerHabitosSexualesPacienteComponent } from './Components/moduloPacientes/fichamedica/ver-habitos-sexuales-paciente/ver-habitos-sexuales-paciente.component';
import { VerUsoMedicamentoComponent } from './Components/moduloPacientes/fichamedica/ver-uso-medicamento/ver-uso-medicamento.component';
import { VerVacunasPacienteComponent } from './Components/moduloPacientes/fichamedica/ver-vacunas-paciente/ver-vacunas-paciente.component';
import { VerAlergiasMedicamentosPacienteComponent } from './Components/moduloPacientes/fichamedica/ver-alergias-medicamentos-paciente/ver-alergias-medicamentos-paciente.component';
import { SetAlergiasComunesPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-alergias-comunes-paciente/set-alergias-comunes-paciente.component';
import { SetEnfermedadesCronicasPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-enfermedades-cronicas-paciente/set-enfermedades-cronicas-paciente.component';
import { SetHabitosPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-habitos-paciente/set-habitos-paciente.component';
import { SetHabitosSexualesPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-habitos-sexuales-paciente/set-habitos-sexuales-paciente.component';
import { SetUsoMedicamentosPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-uso-medicamentos-paciente/set-uso-medicamentos-paciente.component';
import { SetVacunasPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-vacunas-paciente/set-vacunas-paciente.component';
import { SetAlergiasMedicamentosPacienteComponent } from './Components/moduloAtenciones/ficha-atencion/set-alergias-medicamentos-paciente/set-alergias-medicamentos-paciente.component';


@NgModule({
  declarations:
  [
    //Componentes Raiz
    AppComponent,
    LoginComponent,
    //Modulo MP y todos sus componentes
    Homemp,
    Homema,
    PersonaComponent,
    PacientesComponent,
    EstadocivilComponent,
    GenerosComponent,
    ComunasComponent,
    ProvinciasComponent,
    RegionesComponent,
    PrevisionesComponent,
    UsuariosComponent,
    RolesComponent,
    VerFichaMedicaComponent,
    FichaMedicaComponent,

    //Componentes Hijos (CRUD)
    AgregarpersonaComponent,
    EditarpersonaComponent,
    EditarEstadoCComponent,
    AgregarEstadoCComponent,
    EditargeneroComponent,
    AgregargeneroComponent,
    AgregarcomunaComponent,
    EditarcomunaComponent,
    EditarprevisionComponent,
    AgregarprevisionComponent,
    VerPrevisionComponent,
    AgregarprovinciaComponent,
    EditarprovinciaComponent,
    EditarregionesComponent,
    AgregarregionesComponent,
    AgregarrolesComponent,
    EditarrolesComponent,
    EditarusuarioComponent,
    AgregarusuarioComponent,
    VerpersonaComponent,
    EditarpacienteComponent,
    AgregarpacienteComponent,
    TiposangreComponent,
    AgregartipoComponent,
    EditartipoComponent,
    RegistroComponent,
    EditartipoComponent,

    //Modulo Citas
    HomemcComponent,
    BoxconsultaComponent,
    EstadocitaComponent,
    EspecialidadComponent,
    MedicoComponent,
    CitaComponent,
    CalendarHeaderComponent,

    //Modulos hijos (CRUD)
    AgregarboxconsultaComponent,
    EditarboxconsultaComponent,
    AgregarcitaComponent,
    EditarcitaComponent,
    VercitaComponent,
    AgregarespecialidadComponent,
    EditarespecialidadComponent,
    AgregarestadocitaComponent,
    EditarestadocitaComponent,
    AgregarmedicoComponent,
    EditarmedicoComponent,
    MensajeErrorComponent,
    DisponibilidadComponent,
    AtencionComponent,
    DiagnosticoComponent,
    RecetaComponent,
    MedicamentoComponent,
    DiagnosticosatencionComponent,
    ViaadministracionmedicamentoComponent,
    MedicamentosrecetaComponent,
    AlergiaspacienteComponent,
    AgregarAlergiasPacienteComponent,
    EditarAlergiasPacienteComponent,
    AgregarAtencionComponent,
    EditarAtencionComponent,
    AgregarDiagnosticoComponent,
    EditarDiagnosticoComponent,
    AgregarDiagnosticosAtencionComponent,
    EditarDiagnosticosAtencionComponent,
    AgregarMedicamentoComponent,
    EditarMedicamentoComponent,
    AgregarMedicamentosRecetaComponent,
    EditarMedicamentosRecetaComponent,
    AgregarRecetaComponent,
    EditarRecetaComponent,
    AgregarViaAdministracionMedicamentoComponent,
    EditarViaAdministracionMedicamentoComponent,
    VacunaComponent,
    VacunasPacienteComponent,
    HabitoSexualComponent,
    HabitosPacienteComponent,
    HabitoComponent,
    EnfermedadesCronicasPacienteComponent,
    EnfermedadCronicaComponent,
    OcupacionComponent,
    AlergiasComunesPacienteComponent,
    AlergiaComponent,
    GrupoEtnicoComponent,
    UsoMedicamentoComponent,
    AgregarAlergiaComponent,
    EditarAlergiaComponent,
    AgregarAlergiasComunesPacienteComponent,
    EditarAlergiasComunesPacienteComponent,
    AgregarEnfermedadCronicaComponent,
    EditarEnfermedadCronicaComponent,
    AgregarEnfermedadesCronicasPacienteComponent,
    EditarEnfermedadesCronicasPacienteComponent,
    AgregarGrupoEtnicoComponent,
    EditarGrupoEtnicoComponent,
    AgregarHabitoComponent,
    EditarHabitoComponent,
    AgregarHabitoSexualComponent,
    EditarHabitoSexualComponent,
    AgregarHabitosPacienteComponent,
    EditarHabitosPacienteComponent,
    HabitosSexualesPacienteComponent,
    AgregarHabitosSexualesPacienteComponent,
    EditarHabitosSexualesPacienteComponent,
    AgregarOcupacionComponent,
    EditarOcupacionComponent,
    AgregarUsoMedicamentoComponent,
    EditarUsoMedicamentoComponent,
    AgregarVacunaComponent,
    EditarVacunaComponent,
    AgregarVacunasPacienteComponent,
    EditarVacunasPacienteComponent,
    ExamenFisicoComponent,
    AgregarExamenFisicoComponent,
    EditarExamenFisicoComponent,
    FichaAtencionComponent,
    VerAlergiasComunesPacienteComponent,
    VerEnfermedadesCronicasPacienteComponent,
    VerHabitosPacienteComponent,
    VerHabitosSexualesPacienteComponent,
    VerUsoMedicamentoComponent,
    VerVacunasPacienteComponent,
    VerAlergiasMedicamentosPacienteComponent,
    SetAlergiasComunesPacienteComponent,
    SetEnfermedadesCronicasPacienteComponent,
    SetHabitosPacienteComponent,
    SetHabitosSexualesPacienteComponent,
    SetUsoMedicamentosPacienteComponent,
    SetVacunasPacienteComponent,
    SetAlergiasMedicamentosPacienteComponent

    
  ],

  entryComponents:
  [
    //Componentes de entrada para Modales en Materialize
    AgregarpersonaComponent,
    EditarpersonaComponent,
    EditarEstadoCComponent,
    AgregarEstadoCComponent,
    EditargeneroComponent,
    AgregargeneroComponent,
    AgregarcomunaComponent,
    EditarcomunaComponent,
    EditarprevisionComponent,
    AgregarprevisionComponent,
    VerPrevisionComponent,
    AgregarprovinciaComponent,
    EditarprovinciaComponent,
    EditarregionesComponent,
    AgregarregionesComponent,
    AgregarrolesComponent,
    EditarrolesComponent,
    EditarusuarioComponent,
    AgregarusuarioComponent,
    VerpersonaComponent,
    EditarpacienteComponent,
    AgregarpacienteComponent,
    TiposangreComponent,
    AgregartipoComponent,
    EditartipoComponent,
    VerFichaMedicaComponent,
    RegistroComponent,
    AgregarboxconsultaComponent,
    EditarboxconsultaComponent,
    AgregarcitaComponent,
    EditarcitaComponent,
    VercitaComponent,
    AgregarespecialidadComponent,
    EditarespecialidadComponent,
    AgregarestadocitaComponent,
    EditarestadocitaComponent,
    AgregarmedicoComponent,
    EditarmedicoComponent,
    MensajeErrorComponent,
    DisponibilidadComponent,
    AgregarDiagnosticoComponent,
    EditarDiagnosticoComponent,
    AgregarViaAdministracionMedicamentoComponent,
    EditarViaAdministracionMedicamentoComponent,
    AgregarAlergiaComponent,
    EditarAlergiaComponent,
    AgregarAlergiasComunesPacienteComponent,
    EditarAlergiasComunesPacienteComponent,
    AgregarEnfermedadCronicaComponent,
    EditarEnfermedadCronicaComponent,
    AgregarEnfermedadesCronicasPacienteComponent,
    EditarEnfermedadesCronicasPacienteComponent,
    AgregarGrupoEtnicoComponent,
    EditarGrupoEtnicoComponent,
    AgregarHabitoComponent,
    EditarHabitoComponent,
    AgregarHabitosPacienteComponent,
    EditarHabitosPacienteComponent,
    AgregarHabitoSexualComponent,
    EditarHabitoSexualComponent,
    AgregarHabitosSexualesPacienteComponent,
    EditarHabitosSexualesPacienteComponent,
    AgregarOcupacionComponent,
    EditarOcupacionComponent,
    AgregarVacunaComponent,
    EditarVacunaComponent,
    AgregarVacunasPacienteComponent,
    EditarVacunasPacienteComponent,
    AgregarAtencionComponent,
    EditarAtencionComponent,
    AgregarDiagnosticosAtencionComponent,
    EditarDiagnosticosAtencionComponent,
    AgregarMedicamentoComponent,
    EditarMedicamentoComponent,
    AgregarRecetaComponent,
    EditarRecetaComponent,
    AgregarMedicamentosRecetaComponent,
    EditarMedicamentosRecetaComponent,
    AgregarExamenFisicoComponent,
    EditarExamenFisicoComponent,
    AgregarUsoMedicamentoComponent,
    EditarUsoMedicamentoComponent,
    AgregarAlergiasPacienteComponent,
    EditarAlergiasPacienteComponent,
    FichaAtencionComponent
  ],


  imports:
  [
    ReactiveFormsModule,
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule.forRoot(),
    Ng2DeviceDetectorModule.forRoot(),
    NgDatepickerModule,
  ],

  providers:
  [
    appRoutingProviders,
    ComunaService,
    EstadocivilService,
    GeneroService,
    PersonaService,
    PacienteService,
    PrevisionService,
    PrevisionactualService,
    ProvinciaService,
    RegionService,
    RoleService,
    UserService,
    TipoSangreService,
    AuthenticationService,
    EventosService,
    ModuloService,
    PermisoModuloService,
    BoxConsultaService,
    CitaService,
    EspecialidadService,
    EstadoCitaService,
    MedicoService,
    TipoBoxService,
    DisponibilidadService,
    AtencionService,
    DiagnosticoService,
    DiagnosticosAtencionService,
    ViaAdministracionMedicamentoService,
    MedicamentoService,
    MedicamentosRecetaService,
    RecetaService,
    AlergiasMedicamentosPacienteService,
    VacunaService,
    VacunasPacienteService,
    HabitosSexualesPacienteService,
    HabitoSexualService,
    HabitosPacienteService,
    HabitoService,
    EnfermedadCronicaService,
    EnfermedadesCronicasPacienteService,
    OcupacionService,
    GrupoEtnicoService,
    UsoMedicamentoService,
    AlergiaService,
    AlergiasComunesPacienteService,
    ExamenFisicoService,
    AuthGuard,
    LoginGuard,
    InicioGuard,
  ],

  bootstrap:
  [
    AppComponent
  ]

})

export class AppModule { }
