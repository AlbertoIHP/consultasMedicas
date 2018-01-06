import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventosService {
    public seActivo: any;
    public isSingIn: any;
    public isSingOut: any;
    public isSingUp: any;
    public seActivoFicha: any;
    public actualizar: any;

    constructor() {
        this.seActivo = new EventEmitter();
        this.isSingIn = new EventEmitter();
        this.isSingOut = new EventEmitter();
        this.isSingUp = new EventEmitter();
        this.seActivoFicha = new EventEmitter();
        this.actualizar = new EventEmitter();
    }

    public activarFicha(paciente) {
        this.seActivoFicha.emit(paciente);
    }

    public hiceUnCambio() {
      this.seActivo.emit();
    }

    public actualizacion(boolean) {
        this.actualizar.emit(boolean);
    }

    public singIn() {
      this.isSingIn.emit();
    }

    public singOut() {
      this.isSingOut.emit();
    }

    public singUp(newUser) {
      this.isSingUp.emit(newUser);
    }
}