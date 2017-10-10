import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


import { Usuario } from '../../Models/Usuario.model';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthenticationService {
	public token: string;
	public base: string = "http://localhost:8000/api/";
	public headers;
	public options;

	constructor(private http: Http)
	{
		this.headers = new Headers({ 'Content-Type': 'application/json'});
		this.options = new RequestOptions({ headers: this.headers });

		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;
	}


	login(username: string, password: string): Observable<boolean> {

		return this.http.post( this.base+'login', JSON.stringify({ email: username, password: password }), this.options)
			.map(response =>
			{
				if (response.ok)
				{
					let token = response.json() && response.json().token;
					this.token = token;
					localStorage.setItem('currentUser', JSON.stringify({ email: username, token: token }));
					return true;
				}
				else
				{
					return false;
				}



			})
			.catch(e => {
			if (e.status === 401)
			{
				return Observable.throw('Unauthorized');

			}
			else if(e.status === 405)
			{
				return Observable.throw('Unactivated');
			}
		});

	}


	logout(): void {

		console.log("Borrando token del localstorage y del servicio");
		// clear token remove user from local storage to log user out
		this.token = null;

		localStorage.removeItem('currentUser');

	}
}
