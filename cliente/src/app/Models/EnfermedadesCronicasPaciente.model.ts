export class EnfermedadesCronicasPaciente {
	id: number;
	EnfermedadCronica_id: string;
	Paciente_id: string;
	fechaDeteccion: string;
	esVerdadero: boolean;
	constructor()
	{
		this.id = 0;
		this.EnfermedadCronica_id = "";
		this.Paciente_id = "";
		this.fechaDeteccion = null;
		this.esVerdadero = false;
	}
}
