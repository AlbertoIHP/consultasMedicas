export class AlergiasComunesPaciente {
	id: number;
	Alergia_id: number;
	Paciente_id: number;
	fechaDeteccion: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Alergia_id = 0;
		this.Paciente_id = 0;
		this.fechaDeteccion = null;
		this.esVerdadero = false;
	}
}
