import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



//Se importan todos los modulos a rutear
import { AdminhomeComponent } from '../Components/admin/adminhome/adminhome.component';
import { PacientehomeComponent } from '../Components/paciente/pacientehome/pacientehome.component';
import { SecretaryhomeComponent } from '../Components/secretary/secretaryhome/secretaryhome.component';
import { MedichomeComponent } from '../Components/medic/medichome/medichome.component';
import { LoginComponent } from '../Components/login/login/login.component';

//Se declaran como constantes todas las rutas con sus respectivos nombres
const routes: Routes =
[
	//Estas son de ejemplo
	{ path: '',  component: LoginComponent },
	{ path: 'admin',  component: AdminhomeComponent },
  { path: 'paciente',  component: PacientehomeComponent },
  { path: 'secretary',  component: SecretaryhomeComponent },
  { path: 'medic',  component: MedichomeComponent },



  // Este ejemplo es de rutas hijas !!
	// { path: 'project',  component: ProjectmanagerComponent,
	//   children:
	//   [
	//     { path: '', component: PreviewComponent},
	//     { path: 'stakeholder', component: StakeholderComponent },
	//     { path: 'goal', component: GoalComponent },
	//     { path: 'softgoal', component: SoftgoalComponent },
	//     { path: 'nfr', component: NfrComponent },
	//     { path: 'preview', component: PreviewComponent }
	//   ]
	// }


];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

