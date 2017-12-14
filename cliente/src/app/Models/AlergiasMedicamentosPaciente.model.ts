export class AlergiasMedicamentosPaciente {
	id: number;
	Medicamento_id: string;
	Paciente_id: string;
	fechaInicio: string;
	esVerdadero:boolean;

	constructor()
	{
		this.id = 0;
		this.Medicamento_id = "";
		this.Paciente_id = "";
		this.fechaInicio = null;
		this.esVerdadero = false;
	}
	}
}
