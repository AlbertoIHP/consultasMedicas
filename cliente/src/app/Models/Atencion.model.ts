export class Atencion {
	id: number;
	BoxConsulta_id: string;
	Cita_id: string;
	peso: string;
	estatura: string;
	calificacion:number;
	Paciente_id:string;

	constructor()
	{
		this.id = 0;
		this.BoxConsulta_id = "";
		this.Cita_id = "";
		this.peso = "";
		this.estatura = "";
		this.calificacion = 0;
		this.Paciente_id = "";
	}
}
