import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { PermisoModulo } from '../../Models/PermisoModulo.model';

@Injectable()
export class PermisoModuloService {
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
  getPermisoModulos(): Observable<PermisoModulo[]>
  {
    return this.http.get(this.base+'permisoModulos', this.options).map((res: Response) => res.json());
  }

  //POST
  registerPermisoModulo(persona: PermisoModulo)
  {
    return this.http.post( this.base+'permisoModulos', JSON.stringify(persona), this.options).map((res: Response) => res.json());

  }

  //GET
  getPermisoModulo(id) : Observable<PermisoModulo>
  {
    return this.http.get(this.base+'permisoModulos/'+id, this.options).map((res: Response) => res.json());
  }

  //PUT
  editPermisoModulo(persona: PermisoModulo, id: number)
  {
    return this.http.put(this.base+'permisoModulos/'+id, JSON.stringify(persona), this.options).map((res: Response) => res.json());
  }

  //DELETE
  deletePermisoModulo(id) {
    return this.http.delete(this.base+'permisoModulos/'+id, this.options).map((res: Response) => res.json());
  }


}
