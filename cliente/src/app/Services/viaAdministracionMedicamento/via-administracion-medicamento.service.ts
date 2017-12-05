import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { ViaAdministracionMedicamento } from '../../Models/ViaAdministracionMedicamento.model';

@Injectable()
export class ViaAdministracionMedicamentoService {
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
getViaAdministracionMedicamentos(): Observable<ViaAdministracionMedicamento[]>
{
	return this.http.get(this.base+'viaAdministracionMedicamentos', this.options).map((res: Response) => res.json());
}

//POST
registerViaAdministracionMedicamento(viaAdministracionMedicamento: ViaAdministracionMedicamento): Observable<boolean>
{
	return this.http.post( this.base+'viaAdministracionMedicamentos', JSON.stringify(viaAdministracionMedicamento), this.options).map((res: Response) => res.json());

}

//GET
getViaAdministracionMedicamento(id) : Observable<ViaAdministracionMedicamento>
{
	return this.http.get(this.base+'viaAdministracionMedicamentos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editViaAdministracionMedicamento(viaAdministracionMedicamento: ViaAdministracionMedicamento, id: number)
{
	return this.http.put(this.base+'viaAdministracionMedicamentos/'+id, JSON.stringify(viaAdministracionMedicamento), this.options).map((res: Response) => res.json());
}

//DELETE
deleteViaAdministracionMedicamento(id) {
	return this.http.delete(this.base+'viaAdministracionMedicamentos/'+id, this.options).map((res: Response) => res.json());
}



}
