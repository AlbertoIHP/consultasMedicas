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

// SERVICIOS MODULO CITAS
import { BoxConsultaService } from './Services/boxconsulta/box-consulta.service';
import { CitaService } from './Services/cita/cita.service';
import { EspecialidadService } from './Services/especialidad/especialidad.service';
import { EstadoCitaService } from './Services/estadocita/estado-cita.service';
import { MedicoService } from './Services/medico/medico.service';
import { TipoBoxService } from './Services/tipobox/tipo-box.service';


//MODULOS
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Routes/app-routing.module';
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

  //Componentes Tipo Box
  import { TipoboxComponent } from './Components/moduloCitas/tipobox/tipobox.component';
  import { AgregartipoboxComponent } from './Components/moduloCitas/tipobox/agregartipobox/agregartipobox.component';
  import { EditartipoboxComponent } from './Components/moduloCitas/tipobox/editartipobox/editartipobox.component';

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

  //Componente Cita
  import { CitaComponent } from './Components/moduloCitas/cita/cita.component';
  import { AgregarcitaComponent } from './Components/moduloCitas/cita/agregarcita/agregarcita.component';
  import { EditarcitaComponent } from './Components/moduloCitas/cita/editarcita/editarcita.component';
  import { VercitaComponent } from './Components/moduloCitas/cita/vercita/vercita.component';
import { MensajeErrorComponent } from './Components/Globals/mensaje-error/mensaje-error.component';




@NgModule({
  declarations:
  [
    //Componentes Raiz
    AppComponent,
    LoginComponent,
    //Modulo MP y todos sus componentes
    Homemp,
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
    TipoboxComponent,
    BoxconsultaComponent,
    EstadocitaComponent,
    EspecialidadComponent,
    MedicoComponent,
    CitaComponent,

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
    AgregartipoboxComponent,
    EditartipoboxComponent,
    MensajeErrorComponent
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
    AgregartipoboxComponent,
    EditartipoboxComponent,
    MensajeErrorComponent
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
    TipoBoxService
  ],

  bootstrap:
  [
    AppComponent
  ]

})

export class AppModule { }
