import { Component } from '@angular/core';
import { Role } from './Models/Role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public currentUserRole: Role = { idRole: 1, nombre: 'Secretary'};
}
