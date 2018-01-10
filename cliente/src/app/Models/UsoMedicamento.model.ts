export class UsoMedicamento {
	id: number;
	Medicamento_id: number;
	Paciente_id: number;
	fechaInicio: string;
	fueraConsulta: number;
	observacion: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Paciente_id = 0;
		this.Medicamento_id = 0;
		this.fechaInicio = null;
		this.fueraConsulta = 0;
		this.observacion = "";
		this.esVerdadero = false;
	}
}
