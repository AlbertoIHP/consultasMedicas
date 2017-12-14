export class HabitosSexualesPaciente {
	id: number;
	HabitoSexual_id: number;
	Paciente_id: number;
	verdadero: number;
	fechaInicio:string;
	esVerdadero:boolean;
	constructor()
	{
		this.id = 0;
		this.HabitoSexual_id = 0;
		this.Paciente_id = 0;
		this.verdadero = 0;
		this.fechaInicio=null;
		this.esVerdadero=false;
	}
}
