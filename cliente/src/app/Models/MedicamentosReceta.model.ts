export class MedicamentosReceta {
	id: number;
	dosis: string;
	cantidad: number;
	tiempo: number;
	intervalo: number;
	Medicamento_id: string;
	ViaAdministracionMedicamento_id: string;
	Receta_id:string;

	constructor()
	{
		this.id = 0;
		this.dosis = "";
		this.cantidad = 0;
		this.tiempo = 0;
		this.intervalo = 0;
		this.Medicamento_id= "";
		this.ViaAdministracionMedicamento_id = "";
		this.Receta_id = "";
	}
}
