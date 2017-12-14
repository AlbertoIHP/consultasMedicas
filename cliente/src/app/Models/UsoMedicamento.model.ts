export class UsoMedicamento {
	id: number;
	Medicamento_id: string;
	Paciente_id: string;
	fechaInicio: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Paciente_id = "";
		this.Medicamento_id = "";
		this.fechaInicio = null;
		this.esVerdadero = false;
	}
}
