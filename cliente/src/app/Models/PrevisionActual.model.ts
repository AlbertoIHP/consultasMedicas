export class PrevisionActual {
	id: number;
	fechaActualizacion: string;
	Prevision_id: string;
	Persona_id: number;
  activado: number;

	constructor ()
	{
		this.id = 0;
		this.fechaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
		this.Prevision_id = "";
		this.Persona_id = 0;
	  this.activado = 1;
	}
}
