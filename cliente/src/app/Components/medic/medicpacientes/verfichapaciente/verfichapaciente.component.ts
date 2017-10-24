import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PacientefichaComponent } from '../../../paciente/pacienteficha/pacienteficha.component';

import { PersonaService } from '../../../../Services/persona/persona.service';

import { GeneroService } from '../../../../Services/genero/genero.service';

import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

import { RegionService } from '../../../../Services/region/region.service';

import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

import { ComunaService } from '../../../../Services/comuna/comuna.service';

import { TipoSangreService } from '../../../../Services/tiposangre/tiposangre.service';

import { PrevisionactualService } from '../../../../Services/previsionactual/previsionactual.service';

import { PrevisionService } from '../../../../Services/prevision/prevision.service';

import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-verfichapaciente',
  templateUrl: './verfichapaciente.component.html',
  styleUrls: ['./verfichapaciente.component.css']
})
export class VerfichapacienteComponent extends PacientefichaComponent{

  public persona: any;

  constructor(

  	public servicioPersona: PersonaService,
	public servicioRegion: RegionService,
	public servicioProvincia: ProvinciaService,
	public servicioComuna: ComunaService,
	public servicioGenero: GeneroService,
	public servicioEstadoCivil: EstadocivilService,
	public servicioTipoSangre: TipoSangreService,
	public servicioPrevisionActual: PrevisionactualService,
    public servicioPrevision: PrevisionService,
    public servicioPaciente:PacienteService,

      public dialogRef: MatDialogRef<VerfichapacienteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    )
  {

  	super(servicioPersona,servicioRegion,servicioProvincia,servicioComuna,servicioGenero,
  		servicioEstadoCivil,servicioTipoSangre,servicioPrevisionActual,servicioPrevision,
  		servicioPaciente);
    this.persona = data.persona;
    this.idPersona=this.persona.id;
    this.obtenerPersonaPaciente(this.idPersona);
    this.obtenerListaPacientes(this.idPersona);
   
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

 
}
