export class EnfermedadesCronicasPaciente {
	id: number;
	Enfermedad_id: string;
	Paciente_id: string;
	fechaDeteccion: string;

	constructor()
	{
		this.id = 0;
		this.Enfermedad_id = "";
		this.Paciente_id = "";
		this.fechaDeteccion = "";
	}
}
