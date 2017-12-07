import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { GrupoEtnico } from '../../Models/GrupoEtnico.model';

@Injectable()
export class GrupoEtnicoService {

   public base: string = "http://localhost:8000/api/v1/";
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
getGrupoEtnicos(): Observable<GrupoEtnico[]>
{
	return this.http.get(this.base+'grupoEtnicos', this.options).map((res: Response) => res.json());
}

//POST
registerGrupoEtnico(grupoEtnico: GrupoEtnico): Observable<boolean>
{
	return this.http.post( this.base+'grupoEtnicos', JSON.stringify(grupoEtnico), this.options).map((res: Response) => res.json());

}

//GET
getGrupoEtnico(id) : Observable<GrupoEtnico>
{
	return this.http.get(this.base+'grupoEtnicos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editGrupoEtnico(grupoEtnico: GrupoEtnico, id: number)
{
	return this.http.put(this.base+'grupoEtnicos/'+id, JSON.stringify(grupoEtnico), this.options).map((res: Response) => res.json());
}

//DELETE
deleteGrupoEtnico(id) {
	return this.http.delete(this.base+'grupoEtnicos/'+id, this.options).map((res: Response) => res.json());
}


}
