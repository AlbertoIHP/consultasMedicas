export class HabitosSexualesPaciente {
	id: number;
	HabitoSexual_id: string;
	Paciente_id: string;
	verdadero: number;
	fechaInicio:string;
	esVerdadero:boolean;
	constructor()
	{
		this.id = 0;
		this.HabitoSexual_id = "";
		this.Paciente_id = "";
		this.verdadero = 0;
		this.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
		this.esVerdadero=false;
	}
}
