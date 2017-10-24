import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Usuario } from '../../Models/Usuario.model';


@Injectable()
export class UserService {
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
	getUsers(): Observable<Usuario[]>
	{
		return this.http.get(this.base+'users', this.options).map((res: Response) => res.json());
	}

	//POST
	registerUser(usuario: Usuario): Observable<boolean>
	{
		return this.http.post( this.base+'users', JSON.stringify(usuario), this.options).map((res: Response) => res.json());
  //   .map((res: Response) =>
  //   {
  // 		if (res.ok) {
  // 			return true;
  // 		}else{
  // 			return false;
  // 		}
	 //  }).catch( e => {
		// if(e.status === 405)
  // 		{
  // 		  return Observable.throw('Used');
  // 		}
	 //  });

	}

	//GET
	getUser(id) : Observable<Usuario>
	{
		return this.http.get(this.base+'users/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editUser(usuario: Usuario, id: number)
	{
		return this.http.put(this.base+'users/'+id, JSON.stringify(usuario), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteUser(id) {
		return this.http.delete(this.base+'users/'+id, this.options).map((res: Response) => res.json());
	}


}


		//ESTO ES UN EJEMPLO DE VALIDACION PERO SE APLICARA MAS ADELANTE
		// .map(response =>
		//   {
		//     if (response.ok) {
		//         return true;
		//     }else{
		//         return false;
		//     }

		//   }).catch(e => {
		//     console.log(e.status);
		//   if (e.status === 400) {

		//     return Observable.throw('Unauthorized');
		//   }else if(e.status === 500){
		//     return Observable.throw('UsedMail');
		//   }
		// });
