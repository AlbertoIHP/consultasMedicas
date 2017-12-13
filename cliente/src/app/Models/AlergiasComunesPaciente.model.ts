export class AlergiasComunesPaciente {
	id: number;
	Alergia_id: string;
	Paciente_id: string;
	fechaDeteccion: string;

	constructor()
	{
		this.id = 0;
		this.Alergia_id = "";
		this.Paciente_id = "";
		this.fechaDeteccion = new Date().toISOString().slice(0, 19).replace('T', ' ');
	}
}
