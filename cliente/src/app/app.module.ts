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





//MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Routes/app-routing.module';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule, MatInputModule , MatSelectModule, MatDialogModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatIconModule} from '@angular/material';

// COMPONENTES
import { AppComponent } from './app.component';
import { AdminhomeComponent } from './Components/admin/adminhome/adminhome.component';
import { PacientehomeComponent } from './Components/paciente/pacientehome/pacientehome.component';
import { SecretaryhomeComponent } from './Components/secretary/secretaryhome/secretaryhome.component';
import { MedichomeComponent } from './Components/medic/medichome/medichome.component';
import { LoginComponent } from './Components/login/login/login.component';
import { SecretaryprevisionComponent } from './Components/secretary/secretaryprevision/secretaryprevision.component';
import { AdminpacientesComponent } from './Components/admin/adminpacientes/adminpacientes.component';
import { PacientesComponent } from './Components/admin/adminpacientes/pacientes/pacientes.component';
import { EstadocivilComponent } from './Components/admin/adminpacientes/estadocivil/estadocivil.component';
import { GenerosComponent } from './Components/admin/adminpacientes/generos/generos.component';
import { ComunasComponent } from './Components/admin/adminpacientes/comunas/comunas.component';
import { ProvinciasComponent } from './Components/admin/adminpacientes/provincias/provincias.component';
import { RegionesComponent } from './Components/admin/adminpacientes/regiones/regiones.component';
import { PrevisionesComponent } from './Components/admin/adminpacientes/previsiones/previsiones.component';
import { UsuariosComponent } from './Components/admin/adminpacientes/usuarios/usuarios.component';
import { RolesComponent } from './Components/admin/adminpacientes/roles/roles.component';
import { SecretarypersonComponent } from './Components/secretary/secretaryperson/secretaryperson.component';
import { AgregarpersonaComponent } from './Components/secretary/agregarpersona/agregarpersona.component';
import { EditarpersonaComponent } from './Components/secretary/editarpersona/editarpersona.component';
import { EditarEstadoCComponent } from './Components/admin/adminpacientes/estadocivil/editar-estado-c/editar-estado-c.component';
import { AgregarEstadoCComponent } from './Components/admin/adminpacientes/estadocivil/agregar-estado-c/agregar-estado-c.component';
import { EditargeneroComponent } from './Components/admin/adminpacientes/generos/editargenero/editargenero.component';
import { AgregargeneroComponent } from './Components/admin/adminpacientes/generos/agregargenero/agregargenero.component';
import { AgregarcomunaComponent } from './Components/admin/adminpacientes/comunas/agregarcomuna/agregarcomuna.component';
import { EditarcomunaComponent } from './Components/admin/adminpacientes/comunas/editarcomuna/editarcomuna.component';
import { EditarprevisionComponent } from './Components/admin/adminpacientes/previsiones/editarprevision/editarprevision.component';
import { AgregarprevisionComponent } from './Components/admin/adminpacientes/previsiones/agregarprevision/agregarprevision.component';
import { AgregarprovinciaComponent } from './Components/admin/adminpacientes/provincias/agregarprovincia/agregarprovincia.component';
import { EditarprovinciaComponent } from './Components/admin/adminpacientes/provincias/editarprovincia/editarprovincia.component';
import { EditarregionesComponent } from './Components/admin/adminpacientes/regiones/editarregiones/editarregiones.component';
import { AgregarregionesComponent } from './Components/admin/adminpacientes/regiones/agregarregiones/agregarregiones.component';
import { AgregarrolesComponent } from './Components/admin/adminpacientes/roles/agregarroles/agregarroles.component';
import { EditarrolesComponent } from './Components/admin/adminpacientes/roles/editarroles/editarroles.component';
import { EditarusuarioComponent } from './Components/admin/adminpacientes/usuarios/editarusuario/editarusuario.component';
import { AgregarusuarioComponent } from './Components/admin/adminpacientes/usuarios/agregarusuario/agregarusuario.component';


@NgModule({
	declarations:
	[
		AppComponent,
		AdminhomeComponent,
		PacientehomeComponent,
		SecretaryhomeComponent,
		MedichomeComponent,
		LoginComponent,
		SecretaryprevisionComponent,
		AdminpacientesComponent,
		PacientesComponent,
		EstadocivilComponent,
		GenerosComponent,
		ComunasComponent,
		ProvinciasComponent,
		RegionesComponent,
		PrevisionesComponent,
		UsuariosComponent,
		RolesComponent,
		SecretarypersonComponent,
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
		AgregarprovinciaComponent,
		EditarprovinciaComponent,
		EditarregionesComponent,
		AgregarregionesComponent,
		AgregarrolesComponent,
		EditarrolesComponent,
		EditarusuarioComponent,
		AgregarusuarioComponent
	],

	entryComponents:
	[
  	AgregarpersonaComponent,
  	EditarpersonaComponent,
  	SecretaryprevisionComponent,
  	EditarEstadoCComponent,
  	AgregarEstadoCComponent,
    EditargeneroComponent,
    AgregargeneroComponent,
    AgregarcomunaComponent,
    EditarcomunaComponent,
    EditarprevisionComponent,
    AgregarprevisionComponent,
    AgregarprovinciaComponent,
    EditarprovinciaComponent,
    EditarregionesComponent,
    AgregarregionesComponent,
    AgregarrolesComponent,
    EditarrolesComponent,
    EditarusuarioComponent,
    AgregarusuarioComponent
	],

	imports:
	[
		BrowserModule,
		SuiModule,
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
		MatTabsModule
		//NgbModule.forRoot()
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
	AuthenticationService
	],

	bootstrap:
	[
		AppComponent
	]

})
export class AppModule { }
