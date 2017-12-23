import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Receta } from '../../Models/Receta.model';

@Injectable()
export class RecetaService {
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
getRecetas(): Observable<Receta[]>
{
	return this.http.get(this.base+'recetas', this.options).map((res: Response) => res.json());
}

//POST
registerReceta(receta: Receta): Observable<boolean>
{
	return this.http.post( this.base+'recetas', JSON.stringify(receta), this.options).map((res: Response) => res.json());

}

//GET
getReceta(id) : Observable<Receta>
{
	return this.http.get(this.base+'recetas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editReceta(receta: Receta, id: number)
{
	return this.http.put(this.base+'recetas/'+id, JSON.stringify(receta), this.options).map((res: Response) => res.json());
}

//DELETE
deleteReceta(id) {
	return this.http.delete(this.base+'recetas/'+id, this.options).map((res: Response) => res.json());
}


}
