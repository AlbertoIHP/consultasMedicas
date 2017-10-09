//SERVICIOS


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
	appRoutingProviders
	],

	bootstrap:
	[
	  AppComponent
	]

})
export class AppModule { }
