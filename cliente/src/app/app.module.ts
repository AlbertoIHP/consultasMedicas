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




//MODULOS
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Routes/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatStepperModule, MatCardModule, MatGridListModule, MatButtonToggleModule, MatTabsModule, MatInputModule , MatSelectModule, MatDialogModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatIconModule } from '@angular/material';



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

  import { TipoboxComponent } from './Components/moduloCitas/tipobox/tipobox.component';
  import { BoxconsultaComponent } from './Components/moduloCitas/boxconsulta/boxconsulta.component';
  import { EstadocitaComponent } from './Components/moduloCitas/estadocita/estadocita.component';
  import { EspecialidadComponent } from './Components/moduloCitas/especialidad/especialidad.component';
  import { MedicoComponent } from './Components/moduloCitas/medico/medico.component';
  import { CitaComponent } from './Components/moduloCitas/cita/cita.component';
  import { AgregarboxconsultaComponent } from './Components/moduloCitas/boxconsulta/agregarboxconsulta/agregarboxconsulta.component';
  import { EditarboxconsultaComponent } from './Components/moduloCitas/boxconsulta/editarboxconsulta/editarboxconsulta.component';
  import { AgregarcitaComponent } from './Components/moduloCitas/cita/agregarcita/agregarcita.component';
  import { EditarcitaComponent } from './Components/moduloCitas/cita/editarcita/editarcita.component';
  import { VercitaComponent } from './Components/moduloCitas/cita/vercita/vercita.component';
  import { AgregarespecialidadComponent } from './Components/moduloCitas/especialidad/agregarespecialidad/agregarespecialidad.component';
  import { EditarespecialidadComponent } from './Components/moduloCitas/especialidad/editarespecialidad/editarespecialidad.component';
  import { AgregarestadocitaComponent } from './Components/moduloCitas/estadocita/agregarestadocita/agregarestadocita.component';
  import { EditarestadocitaComponent } from './Components/moduloCitas/estadocita/editarestadocita/editarestadocita.component';
  import { AgregarmedicoComponent } from './Components/moduloCitas/medico/agregarmedico/agregarmedico.component';
  import { EditarmedicoComponent } from './Components/moduloCitas/medico/editarmedico/editarmedico.component';
  import { AgregartipoboxComponent } from './Components/moduloCitas/tipobox/agregartipobox/agregartipobox.component';
  import { EditartipoboxComponent } from './Components/moduloCitas/tipobox/editartipobox/editartipobox.component';









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
    TipoboxComponent,
    BoxconsultaComponent,
    EstadocitaComponent,
    EspecialidadComponent,
    MedicoComponent,
    CitaComponent,
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
    HomemcComponent
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
    RegistroComponent
  ],


  imports:
  [
    ReactiveFormsModule,
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatListModule
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
    PermisoModuloService
  ],

  bootstrap:
  [
    AppComponent
  ]

})

export class AppModule { }
