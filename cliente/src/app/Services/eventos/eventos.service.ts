import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventosService {
    public seActivo: any;


    constructor() {
        this.seActivo = new EventEmitter();
    }


    public hiceUnCambio()
    {
      this.seActivo.emit();
    }
}
