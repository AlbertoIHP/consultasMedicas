export class Usuario {
  id: number;
	email: string;
	password: string;
	Role_id: number;
	Persona_id: number;

	constructor()
	{
	this.id = 0;
		this.email = "";
		this.password = "";
		this.Role_id = 0;
		this.Persona_id = 0;
	}
}
