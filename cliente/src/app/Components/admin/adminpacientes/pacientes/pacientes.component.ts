import { Component, ElementRef,  ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Persona } from '../../../../Models/Persona.model';
import { PersonaService } from '../../../../Services/persona/persona.service';

import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../../Models/Region.model';
import { RegionService } from '../../../../Services/region/region.service';

import { Provincia } from '../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

import { Comuna } from '../../../../Models/Comuna.model';
import { ComunaService } from '../../../../Services/comuna/comuna.service';

import { AgregarpersonaComponent } from '../../../secretary/agregarpersona/agregarpersona.component';
import { EditarpersonaComponent } from '../../../secretary/editarpersona/editarpersona.component';
import { SecretaryprevisionComponent } from '../../../secretary/secretaryprevision/secretaryprevision.component';
import { SecretarypersonComponent } from '../../../secretary/secretaryperson/secretaryperson.component';

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




@Component({
	selector: 'app-pacientes',
	templateUrl: './pacientes.component.html',
	styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent extends SecretarypersonComponent {



	constructor(
    public servicioPersona: PersonaService,
    public servicioRegion: RegionService,
    public servicioProvincia: ProvinciaService,
    public servicioComuna: ComunaService,
    public servicioGenero: GeneroService,
    public servicioEstadoCivil: EstadocivilService,
    public router: Router,
    public dialog: MatDialog
    )
	{
    super(servicioPersona, servicioRegion, servicioProvincia, servicioComuna, servicioGenero, servicioEstadoCivil, router, dialog);
	}





 /// FUNCIONALIDADES EXCLUSIVAS


  eliminarPaciente (paciente)
  {
    this.servicioPersona.deletePersona(paciente.id).subscribe( data => {
      console.log(data);
      this.actualizarPersonas();
    });
  }

  desactivarPaciente (paciente)
  {
    paciente.estado = 0;
    this.pasarStringId(paciente);
    this.servicioPersona.editPersona(paciente, paciente.id).subscribe(data => {
      console.log(data);
      this.actualizarPersonas();
    });

  }

  activarPaciente (paciente)
  {
    paciente.estado = 1;
    this.pasarStringId(paciente);
    this.servicioPersona.editPersona(paciente, paciente.id).subscribe(data => {
      console.log(data);
      this.actualizarPersonas();
    });
  }












}
