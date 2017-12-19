export class VacunasPaciente {
	id: number;
	Vacuna_id: number;
	Paciente_id: number;
	fechaVacunacion: string;
	esVerdadero: boolean;

	constructor()
	{
		this.id = 0;
		this.Paciente_id = 0;
		this.Vacuna_id = 0;
		this.fechaVacunacion = null;
		this.esVerdadero = false;
	}
}
