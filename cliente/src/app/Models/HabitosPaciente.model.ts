export class HabitosPaciente {
	id: number;
	Habito_id: string;
	Paciente_id: string;
	fechaInicio: string;

	constructor()
	{
		this.id = 0;
		this.Habito_id = "";
		this.Paciente_id = "";
		this.fechaInicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
	}
}
