export class Cita {
  id: number;
  fecha: string;
  hora: string;
  EstadoCita_id: string;
  BoxConsulta_id: string;
  Paciente_id: string;
  Medico_id: string;

  constructor ()
  {
	this.id = 0;
	this.fecha = "";
	this.hora = "";
	this.EstadoCita_id = "";
	this.BoxConsulta_id = "";
	this.Paciente_id = "";
	this.Medico_id = "";
  }
}
