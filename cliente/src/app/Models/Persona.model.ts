export class Persona {
	id: number;
	rut: string;
	nombre1: string;
	nombre2: string;
	apellido1: string;
	apellido2: string;
	fono_casa: string;
	fono_trabajo: string;
	movil: string;
	Genero_id: string;
	EstadoCivil_id: string;
	Comuna_id: string;
	estado: number;
	fechaNacimiento: string;

	constructor()
	{
		this.id = 0;
		this.rut = "";
		this.nombre1 = "";
		this.nombre2 = "";
		this.apellido1 = "";
		this.apellido2 = "";
		this.fono_casa = "";
		this.fono_trabajo = "";
		this.movil = "";
		this.Genero_id = "";
		this.EstadoCivil_id = "";
		this.Comuna_id = "";
		this.estado = 1;
		this.fechaNacimiento = "";
	}
}
