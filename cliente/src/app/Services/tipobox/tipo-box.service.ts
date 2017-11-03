import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { TipoBox } from '../../Models/TipoBox.model';

@Injectable()
export class TipoBoxService {
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
getTipoBoxs(): Observable<TipoBox[]>
{
	return this.http.get(this.base+'tipoBoxs', this.options).map((res: Response) => res.json());
}

//POST
registerTipoBox(tipoBox: TipoBox): Observable<boolean>
{
	return this.http.post( this.base+'tipoBoxs', JSON.stringify(tipoBox), this.options).map((res: Response) => res.json());

}

//GET
getTipoBox(id) : Observable<TipoBox>
{
	return this.http.get(this.base+'tipoBoxs/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editTipoBox(tipoBox: TipoBox, id: number)
{
	return this.http.put(this.base+'tipoBoxs/'+id, JSON.stringify(tipoBox), this.options).map((res: Response) => res.json());
}

//DELETE
deleteTipoBox(id) {
	return this.http.delete(this.base+'tipoBoxs/'+id, this.options).map((res: Response) => res.json());
}


}
