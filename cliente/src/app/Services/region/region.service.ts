import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Region } from '../../Models/Region.model';

@Injectable()
export class RegionService {
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
	getRegions(): Observable<Region[]>
	{
		return this.http.get(this.base+'regions', this.options).map((res: Response) => res.json());
	}

	//POST
	registerRegion(region: Region): Observable<boolean>
	{
		return this.http.post( this.base+'v1/regions', JSON.stringify(region), this.options).map((res: Response) => res.json());

	}

	//GET
	getRegion(id) : Observable<Region>
	{
		return this.http.get(this.base+'regions/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editRegion(region: Region, id: number)
	{
		return this.http.put(this.base+'regions/'+id, JSON.stringify(region), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteRegion(id) {
		return this.http.delete(this.base+'regions/'+id, this.options).map((res: Response) => res.json());
	}


}
