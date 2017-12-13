export class UsoMedicamento {
	id: number;
	Medicamento_id: string;
	Paciente_id: string;
	fechaInicio: string;

	constructor()
	{
		this.id = 0;
		this.Paciente_id = "";
		this.Medicamento_id = "";
		this.fechaInicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
	}
}
