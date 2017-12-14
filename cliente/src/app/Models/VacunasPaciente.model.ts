export class VacunasPaciente {
	id: number;
	Vacuna_id: string;
	Paciente_id: string;
	fechaVacunacion: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Paciente_id = "";
		this.Vacuna_id = "";
		this.fechaVacunacion = null;
		this.esVerdadero = false;
	}
}
