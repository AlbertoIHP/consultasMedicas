import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventosService {
    public seActivo: any;
    public isSingIn: any
    public isSingOut: any
    public isSingUp: any

    constructor() {
        this.seActivo = new EventEmitter();
        this.isSingIn = new EventEmitter()
        this.isSingOut = new EventEmitter()
        this.isSingUp = new EventEmitter()


    }


    public hiceUnCambio()
    {
      this.seActivo.emit();
    }


    public singIn()
    {
      this.isSingIn.emit()
    }

    public singOut()
    {
      this.isSingOut.emit()
    }

    public singUp(newUser)
    {
      this.isSingUp.emit(newUser)
    }

}
