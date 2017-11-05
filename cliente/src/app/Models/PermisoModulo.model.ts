export class PermisoModulo {
  id: number;
  Role_id: string;
  Modulo_id: string;
  write: any;
  erase: any;
  update: any;
  view: any;

  constructor()
  {
    this.id = 0;
    this.Role_id = "";
    this.Modulo_id = "";
    this.write = false;
    this.erase = false;
    this.update = false;
    this.view = false;
  }
}
