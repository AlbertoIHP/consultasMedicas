export class Medico {
  id: number;
  Especialidad_id: string;
  Persona_id: string;
  rut: string;
  activado: number;

  constructor ()
  {
	this.id = 0;
	this.Especialidad_id = "";
	this.Persona_id = "";
	this.rut = "";
    this.activado = 0;
  }
}
