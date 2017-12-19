export class EnfermedadesCronicasPaciente {
	id: number;
	EnfermedadCronica_id: number;
	Paciente_id: number;
	fechaDeteccion: string;
	esVerdadero: boolean;
	constructor()
	{
		this.id = 0;
		this.EnfermedadCronica_id = 0;
		this.Paciente_id = 0;
		this.fechaDeteccion = null;
		this.esVerdadero = false;
	}
}
