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
	Genero_id: number;
	EstadoCivil_id: number;
	Comuna_id: number;
	estado: number;
	fechaNacimiento: string;
	direccion: string;

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
		this.Genero_id = 0;
		this.EstadoCivil_id = 0;
		this.Comuna_id = 0;
		this.estado = 1;
		this.fechaNacimiento = "";
		this.direccion = "";
	}
}
