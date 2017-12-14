export class AlergiasComunesPaciente {
	id: number;
	Alergia_id: string;
	Paciente_id: string;
	fechaDeteccion: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Alergia_id = "";
		this.Paciente_id = "";
		this.fechaDeteccion = null;
		this.esVerdadero = false;
	}
}
