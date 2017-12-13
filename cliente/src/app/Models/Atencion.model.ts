export class Atencion {
	id: number;
	BoxConsulta_id: string;
	Cita_id: string;
	calificacionAtencionMedica: number;
	Paciente_id:string;
	ExamenFisico_id:string;

	constructor()
	{
		this.id = 0;
		this.BoxConsulta_id = "";
		this.Cita_id = "";
		this.calificacionAtencionMedica = 0;
		this.Paciente_id = "";
		this.ExamenFisico_id = "";
	}
}
