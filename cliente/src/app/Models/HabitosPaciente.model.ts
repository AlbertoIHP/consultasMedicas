export class HabitosPaciente {
	id: number;
	Habito_id: string;
	Paciente_id: string;
	fechaInicio: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Habito_id = "";
		this.Paciente_id = "";
		this.fechaInicio = null;
		this.esVerdadero = false;
	}
}
