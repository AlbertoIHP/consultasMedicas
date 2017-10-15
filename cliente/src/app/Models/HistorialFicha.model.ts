export class HistorialFicha {
	id: number;
	fechaConsulta: string;
	informacionMedica: string;
	FichaMedica_id: number;
	habitos: string;
	peso: string;
	estatura: string;

	constructor ()
	{
		this.id = 0;
		this.fechaConsulta = "";
		this.informacionMedica = "";
		this.FichaMedica_id = 0;
		this.habitos = "";
		this.peso = "";
		this.estatura = "";
	}
}
