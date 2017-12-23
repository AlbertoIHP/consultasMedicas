import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Disponibilidad } from '../../Models/Disponibilidad.model';


@Injectable()
export class DisponibilidadService {
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
  getDisponibilidads(): Observable<Disponibilidad[]>
  {
    return this.http.get(this.base+'disponibilidads', this.options).map((res: Response) => res.json());
  }

  //POST
  registerDisponibilidad(dis: Disponibilidad)
  {
    return this.http.post( this.base+'disponibilidads', JSON.stringify(dis), this.options).map((res: Response) => res.json());

  }

  //GET
  getDisponibilidad(id) : Observable<Disponibilidad>
  {
    return this.http.get(this.base+'disponibilidads/'+id, this.options).map((res: Response) => res.json());
  }

  //PUT
  editDisponibilidad(dis: Disponibilidad, id: number)
  {
    return this.http.put(this.base+'disponibilidads/'+id, JSON.stringify(dis), this.options).map((res: Response) => res.json());
  }

  //DELETE
  deleteDisponibilidad(id) {
    return this.http.delete(this.base+'disponibilidads/'+id, this.options).map((res: Response) => res.json());
  }


}

