export class ExamenFisico {
	id: number;
	fechaExamen: string;
	peso: number;
	estatura: number;

	constructor()
	{
		this.id = 0;
		this.fechaExamen = new Date().toISOString().slice(0, 19).replace('T', ' ');
		this.peso = 0.0;
		this.estatura = 0.0;
	}
}
