import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { EnfermedadCronica } from '../../Models/EnfermedadCronica.model';

@Injectable()
export class EnfermedadCronicaService {

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
getEnfermedadesCronicas(): Observable<EnfermedadCronica[]>
{
	return this.http.get(this.base+'enfermedadCronicas', this.options).map((res: Response) => res.json());
}

//POST
registerEnfermedadCronica(enfermedadCronica: EnfermedadCronica): Observable<boolean>
{
	return this.http.post( this.base+'enfermedadCronicas', JSON.stringify(enfermedadCronica), this.options).map((res: Response) => res.json());

}

//GET
getEnfermedadCronica(id) : Observable<EnfermedadCronica>
{
	return this.http.get(this.base+'enfermedadCronicas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editEnfermedadCronica(enfermedadCronica: EnfermedadCronica, id: number)
{
	return this.http.put(this.base+'enfermedadCronicas/'+id, JSON.stringify(enfermedadCronica), this.options).map((res: Response) => res.json());
}

//DELETE
deleteEnfermedadCronica(id) {
	return this.http.delete(this.base+'enfermedadCronicas/'+id, this.options).map((res: Response) => res.json());
}

}
