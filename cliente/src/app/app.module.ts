//SERVICIOS
import { ComunaService } from './Services/comuna/comuna.service';
import { EstadocivilService } from './Services/estadocivil/estadocivil.service';
import { FichamedicaService } from './Services/fichamedica/fichamedica.service';
import { GeneroService } from './Services/genero/genero.service';
import { HistorialfichaService } from './Services/historialficha/historialficha.service';
import { PersonaService } from './Services/persona/persona.service';
import { PrevisionService } from './Services/prevision/prevision.service';
import { PrevisionactualService } from './Services/previsionactual/previsionactual.service';
import { ProvinciaService } from './Services/provincia/provincia.service';
import { RegionService } from './Services/region/region.service';
import { RoleService } from './Services/role/role.service';
import { UserService } from './Services/user/user.service';






//MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Routes/app-routing.module';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// COMPONENTES
import { AppComponent } from './app.component';
import { AdminhomeComponent } from './Components/admin/adminhome/adminhome.component';
import { PacientehomeComponent } from './Components/paciente/pacientehome/pacientehome.component';
import { SecretaryhomeComponent } from './Components/secretary/secretaryhome/secretaryhome.component';
import { MedichomeComponent } from './Components/medic/medichome/medichome.component';
import { LoginComponent } from './Components/login/login/login.component';

@NgModule({
	declarations:
	[
	  AppComponent,
	  AdminhomeComponent,
	  PacientehomeComponent,
	  SecretaryhomeComponent,
	  MedichomeComponent,
	  LoginComponent
	],

	imports:
	[
	  BrowserModule,
	  SuiModule,
	  routing
	],

	providers:
	[
  	appRoutingProviders,
    ComunaService,
    EstadocivilService,
    FichamedicaService,
    GeneroService,
    HistorialfichaService,
    PersonaService,
    PrevisionService,
    PrevisionactualService,
    ProvinciaService,
    RegionService,
    RoleService,
    UserService
	],

	bootstrap:
	[
	  AppComponent
	]

})
export class AppModule { }
