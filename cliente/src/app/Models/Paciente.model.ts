export class Paciente {
  id: number;
  Persona_id: string;
  TipoSangre_id: string;
  GrupoEtnico_id: string;
  Ocupacion_id: string;
  rut: string;
  activado: number;

	constructor()
	{
		this.id = 0;
		this.Persona_id = "";
		this.TipoSangre_id = "";
    	this.rut = "";
    	this.activado = 0;
	}
}
