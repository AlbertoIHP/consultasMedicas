export class FichaMedica {
	id: number;
	nombre: string;
	persona: number;
	nombreResponsable: string;
	fechaCreacion: string;
	pesoActual: string;
	estaturaActual: string;
	TipoSangre_id: number;

	constructor ()
	{
		this.id = 0;
		this.nombre = "";
		this.persona = 0;
		this.nombreResponsable = "";
		this.fechaCreacion = "";
		this.pesoActual = "";
		this.estaturaActual = "";
		this.TipoSangre_id = 0;

	}


}
