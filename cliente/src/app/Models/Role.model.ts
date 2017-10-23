export class Role {
    id: number;
    nombre: string;
    write: number;
    view: number;
    edit: number;
    erase: number;

    constructor ()
    {
        this.id = 0;
        this.nombre = "";
        this.write = 0;
        this.edit = 0;
        this.erase = 0;
        this.view = 0 ;
    }
}
