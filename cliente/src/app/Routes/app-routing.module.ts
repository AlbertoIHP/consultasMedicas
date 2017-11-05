import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Homemp } from '../Components/moduloPacientes/homemp.component';
import { HomemcComponent } from '../Components/moduloCitas/homemc.component';

import { LoginComponent } from '../Components/login/login.component'


//Se importan todos los modulos a rutear


//Se declaran como constantes todas las rutas con sus respectivos nombres
const routes: Routes =
[
	//Login como pagina principal
	{ path: '',  component: LoginComponent },

  //Rutas MODULO
  //MODULO PACIENTES
	{ path: 'moduloPacientes',  component: Homemp },
  { path: 'moduloCitas',  component: HomemcComponent }







];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

