export class PermisoModulo {
  id: number;
  Role_id: string;
  Modulo_id: string;
  write: number;
  delete: number;
  update: number;
  view: number;

  constructor()
  {
    this.id = 0;
    this.Role_id = "";
    this.Modulo_id = "";
    this.write = 0;
    this.delete = 0;
    this.update = 0;
    this.view = 0;
  }
}
