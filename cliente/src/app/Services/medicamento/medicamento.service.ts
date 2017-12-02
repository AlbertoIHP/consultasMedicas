import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Medicamento } from '../../Models/Medicamento.model';

@Injectable()
export class MedicamentoService {
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
getMedicamentos(): Observable<Medicamento[]>
{
	return this.http.get(this.base+'medicamentos', this.options).map((res: Response) => res.json());
}

//POST
registerMedicamento(medicamento: Medicamento): Observable<boolean>
{
	return this.http.post( this.base+'medicamentos', JSON.stringify(medicamento), this.options).map((res: Response) => res.json());

}

//GET
getMedicamento(id) : Observable<Medicamento>
{
	return this.http.get(this.base+'medicamentos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editMedicamento(medicamento: Medicamento, id: number)
{
	return this.http.put(this.base+'medicamentos/'+id, JSON.stringify(medicamento), this.options).map((res: Response) => res.json());
}

//DELETE
deleteMedicamento(id) {
	return this.http.delete(this.base+'medicamentos/'+id, this.options).map((res: Response) => res.json());
}


}
