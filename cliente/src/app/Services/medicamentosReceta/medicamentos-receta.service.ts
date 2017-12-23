import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { MedicamentosReceta } from '../../Models/MedicamentosReceta.model';

@Injectable()
export class MedicamentosRecetaService {
public base: string = base.api;
public options: RequestOptions;
public headers: Headers;

constructor(private http: Http, private authenticationService: AuthenticationService)
{
	this.headers = new Headers(
	{
		'Authorization': 'Bearer ' + this.authenticationService.token,
		'Content-Type': 'application/json'
	});

	this.options = new RequestOptions({ headers: this.headers });


}
//GET
getMedicamentosRecetas(): Observable<MedicamentosReceta[]>
{
	return this.http.get(this.base+'medicamentosRecetas', this.options).map((res: Response) => res.json());
}

//POST
registerMedicamentosReceta(medicamentosReceta: MedicamentosReceta): Observable<boolean>
{
	return this.http.post( this.base+'medicamentosRecetas', JSON.stringify(medicamentosReceta), this.options).map((res: Response) => res.json());

}

//GET
getMedicamentosReceta(id) : Observable<MedicamentosReceta>
{
	return this.http.get(this.base+'medicamentosRecetas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editMedicamentosReceta(medicamentosReceta: MedicamentosReceta, id: number)
{
	return this.http.put(this.base+'medicamentosRecetas/'+id, JSON.stringify(medicamentosReceta), this.options).map((res: Response) => res.json());
}

//DELETE
deleteMedicamentosReceta(id) {
	return this.http.delete(this.base+'medicamentosRecetas/'+id, this.options).map((res: Response) => res.json());
}

}
