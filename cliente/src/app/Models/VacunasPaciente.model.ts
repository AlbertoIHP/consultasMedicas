export class VacunasPaciente {
	id: number;
	Vacuna_id: string;
	Paciente_id: string;
	fechaVacunacion: string;

	constructor()
	{
		this.id = 0;
		this.Paciente_id = "";
		this.Vacuna_id = "";
		this.fechaVacunacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
	}
}
