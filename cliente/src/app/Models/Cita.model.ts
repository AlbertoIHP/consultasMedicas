export class Cita {
  id: number;
  EstadoCita_id: string;
  BoxConsulta_id: string;
  Paciente_id: string;
  Disponibilidad_id: string;

  constructor ()
  {
	this.id = 0;
	this.EstadoCita_id = "";
	this.BoxConsulta_id = "";
	this.Paciente_id = "";
	this.Disponibilidad_id = "";
  }
}
