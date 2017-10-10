import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Role } from '../../Models/Role.model';


@Injectable()
export class RoleService {
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
	getRoles(): Observable<Role[]>
	{
		return this.http.get(this.base+'roles', this.options).map((res: Response) => res.json());
	}

	//POST
	registerRole(role: Role)
	{
		return this.http.post( this.base+'v1/roles', JSON.stringify(Role), this.options).map((res: Response) => res.json());

	}

	//GET
	getRole(id) : Observable<Role>
	{
		return this.http.get(this.base+'roles/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editRole(role: Role, id: number)
	{
		return this.http.put(this.base+'roles/'+id, JSON.stringify(role), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteRole(id) {
		return this.http.delete(this.base+'roles/'+id, this.options).map((res: Response) => res.json());
	}


}
