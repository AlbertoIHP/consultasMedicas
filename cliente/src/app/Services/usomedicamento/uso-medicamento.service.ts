import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { UsoMedicamento } from '../../Models/UsoMedicamento.model';
@Injectable()
export class UsoMedicamentoService {

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
getUsoMedicamentos(): Observable<UsoMedicamento[]>
{
	return this.http.get(this.base+'usoMedicamentos', this.options).map((res: Response) => res.json());
}

//POST
registerUsoMedicamento(usoMedicamento: UsoMedicamento): Observable<boolean>
{
	return this.http.post( this.base+'usoMedicamentos', JSON.stringify(usoMedicamento), this.options).map((res: Response) => res.json());

}

//GET
getUsoMedicamento(id) : Observable<UsoMedicamento>
{
	return this.http.get(this.base+'usoMedicamentos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editUsoMedicamento(usoMedicamento: UsoMedicamento, id: number)
{
	return this.http.put(this.base+'usoMedicamentos/'+id, JSON.stringify(usoMedicamento), this.options).map((res: Response) => res.json());
}

//DELETE
deleteUsoMedicamento(id) {
	return this.http.delete(this.base+'usoMedicamentos/'+id, this.options).map((res: Response) => res.json());
}

}
