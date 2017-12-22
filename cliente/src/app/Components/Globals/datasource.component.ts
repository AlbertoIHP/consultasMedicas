//DATATABLES
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Component, ElementRef, ViewChild, Inject } from '@angular/core';




export class ExampleDatabase {

  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(ec)
  {
    // Fill up the database with 100 users.
    for (let i = 0; i < ec.length; i++) { this.addUser(ec[i]); }
  }

  /** Adds a new user to the database. */
  addUser(ec) {
    const copiedData = this.data.slice();
    copiedData.push(ec);
    this.dataChange.next(copiedData);
  }



}


export class dataTable extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {

    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {

      const data = this._exampleDatabase.data.slice();
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;


      return data.splice(startIndex, this._paginator.pageSize);

    });
  }

  disconnect() {}
}



export class buscadorPorNombre extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  public filtro;

  constructor(private _exampleDatabase: ExampleDatabase, filtro) {
    super();
    this.filtro = filtro;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: any) => {



        if(this.filtro === "Usuario")
        {
           let searchStr = (item.email ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if( this.filtro === "Role")
        {
           let searchStr = (item.nombre ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if( this.filtro === "EC" || this.filtro === "Region" || this.filtro === "Provincia" || this.filtro === "Comuna" || this.filtro === "Prevision" || this.filtro === "Genero" || this.filtro === "EstadoCita" || this.filtro === "Especialidad" || this.filtro === "TipoBox" || this.filtro === "Alergia" || this.filtro === "EnfermedadCronica" || this.filtro === "GrupoEtnico")
        {
           let searchStr = (item.nombre ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if( this.filtro === "Persona")
        {
           let searchStr = (item.rut ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }
        else if(this.filtro === "EC" )
        {
           let searchStr = (item.nombre ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }else if(this.filtro === "Paciente" || this.filtro === "Medico")
        {
           let searchStr = (item.rut ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro === "BoxConsulta"){
           let searchStr = (item.ubicacion).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro === "Diagnostico"){
           let searchStr = (item.diagnostico).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
           
        }else if(this.filtro == "ViaAdminMed"){

           let searchStr = (item.descripcion.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Ocupacion"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Vacuna"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "ExamenFisico"){

           let searchStr = (item.fechaExamen.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VacunasPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "UsoMedicamento"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "HabitosPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "HabitosSexualesPaciente"){ 

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Habito"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        
        }else if(this.filtro == "HabitoSexual"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }else if(this.filtro == "EnfermedadesCronicasPaciente"){ 

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "AlergiasComunesPaciente"){ 

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Medicamento"){ 

           let searchStr = (item.nombrecomun.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "AlergiasMedicamentosPaciente"){ 

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerAlergiasComunesPaciente"){ 

           let searchStr = (item.nombreAlergia.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerEnfermedadesCronicasPaciente"){ 

           let searchStr = (item.nombreEnfermedad.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerHabitosPaciente"){ 

           let searchStr = (item.nombreHabito.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerHabitosSexualesPaciente"){ 

           let searchStr = (item.nombreHabitoSexual.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerUsoMedicamentosPaciente"){ 

           let searchStr = (item.nombreMedicamento.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerVacunasPaciente"){ 

           let searchStr = (item.nombreVacunas.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerAlergiasMedicamentosPaciente"){ 

           let searchStr = (item.nombreMedicamento.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }


      });
    });
  }

  disconnect() {}
}


/////////////////////////////////////////////////////////////////////////////////////




export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  public filtro;
  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort,
    filtro
    )
  {
    super();

    this.filtro = filtro;


    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((item: any) => {


        if(this.filtro === "Usuario")
        {
           let searchStr = (item.email ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if( this.filtro === "Role")
        {
           let searchStr = (item.nombre ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if( this.filtro === "EC" || this.filtro === "Region" || this.filtro === "Provincia" || this.filtro === "Comuna" || this.filtro === "Prevision" || this.filtro === "Genero" || this.filtro === "EstadoCita" || this.filtro === "Especialidad" || this.filtro === "TipoBox" || this.filtro === "Alergia" || this.filtro === "EnfermedadCronica" || this.filtro === "GrupoEtnico")
        {
           let searchStr = (item.nombre ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if( this.filtro === "Persona")
        {
           let searchStr = (item.rut ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }
        else if(this.filtro === "EC" )
        {
           let searchStr = (item.nombre ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if(this.filtro === "Paciente" || this.filtro === "Medico")
        {

           let searchStr = (item.rut ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }
        else if(this.filtro == "BoxConsulta")
        {

           let searchStr = (item.ubicacion).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if(this.filtro == "TS")
        {

           let searchStr = (item.nombre).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        else if(this.filtro == "Citas")
        {

           let searchStr = (item.Medico_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Diagnostico"){

           let searchStr = (item.diagnostico.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "ViaAdminMed"){

           let searchStr = (item.descripcion.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Ocupacion"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "Vacuna"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "ExamenFisico"){

           let searchStr = (item.fechaExamen.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VacunasPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "UsoMedicamento"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "HabitosPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "HabitosSexualesPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
           
        }else if(this.filtro == "Habito"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        } else if(this.filtro == "HabitoSexual"){

           let searchStr = (item.nombre.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        } else if(this.filtro == "EnfermedadesCronicasPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
           
        } else if(this.filtro == "AlergiasComunesPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
           
        }else if(this.filtro == "Medicamento"){

           let searchStr = (item.nombrecomun.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
           
        }else if(this.filtro == "AlergiasMedicamentosPaciente"){

           let searchStr = (item.Persona_id.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;
           
        }else if(this.filtro == "VerAlergiasComunesPaciente"){ 

           let searchStr = (item.nombreAlergia.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerEnfermedadesCronicasPaciente"){ 

           let searchStr = (item.nombreEnfermedad.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerHabitosPaciente"){ 

           let searchStr = (item.nombreHabito.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerHabitosSexualesPaciente"){ 

           let searchStr = (item.nombreHabitoSexual.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerUsoMedicamentosPaciente"){ 

           let searchStr = (item.nombreMedicamento.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerVacunasPaciente"){ 

           let searchStr = (item.nombreVacuna.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }else if(this.filtro == "VerAlergiasMedicamentosPaciente"){ 

           let searchStr = (item.nombreMedicamento.toString()).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) != -1;

        }






      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: any[]): any[]
  {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';


        if(this.filtro === "Usuario")
        {
          switch (this._sort.active)
          {
            case 'Email': [propertyA, propertyB] = [a.email, b.email]; break;
            case 'Role': [propertyA, propertyB] = [a.Role_id, b.Role_id]; break;
          }
        }
        else if( this.filtro === "Role")
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if( this.filtro === "EC")
        {

        }
        else if( this.filtro === "Persona")
        {
          switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.apellido1, b.apellido1]; break;
            case 'Telefonos': [propertyA, propertyB] = [a.movil, b.movil]; break;
            case 'Sexo': [propertyA, propertyB] = [a.Genero_id, b.Genero_id]; break;
            case 'Comuna': [propertyA, propertyB] = [a.Comuna_id, b.Comuna_id]; break;
            case 'Estado Civil': [propertyA, propertyB] = [a.EstadoCivil_id, b.EstadoCivil_id]; break;
          }
        }
        else if(this.filtro === "EC" )
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
          }
        }
        else if(this.filtro === "Paciente")
        {
          switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Tipo Sangre': [propertyA, propertyB] = [a.TipoSangre_id, b.TipoSangre_id]; break;
          }
        }
        else if(this.filtro == "BoxConsulta")
        {
          switch (this._sort.active)
          {
            case 'Ubicacion': [propertyA, propertyB] = [a.ubicacion, b.ubicacion]; break;
            case 'TipoBox': [propertyA, propertyB] = [a.TipoBox_id, b.TipoBox_id]; break;
          }
        }
        else if(this.filtro === "Region")
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "Provincia")
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Region': [propertyA, propertyB] = [a.Region_id, b.Region_id]; break;
          }
        }
        else if(this.filtro === "Comuna")
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Provincia': [propertyA, propertyB] = [a.Provincia_id, b.Provincia_id]; break;
          }
        }
        else if(this.filtro === "Prevision")
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
          }
        }
        else if(this.filtro === "Genero" )
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
            case 'Isapre': [propertyA, propertyB] = [a.isapre, b.isapre]; break;
          }
        }
        else if(this.filtro === "EstadoCita" )
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
          }
        }
        else if(this.filtro === "Especialidad" )
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "Medico" )
        {
          switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Especialidad': [propertyA, propertyB] = [a.Especialidad_id, b.Especialidad_id]; break;
          }
        }
        else if(this.filtro === "TS" )
        {
          switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            case 'Descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
          }
        }
        else if(this.filtro === "Citas" )
        {
          switch (this._sort.active)
          {
            case 'Fecha': [propertyA, propertyB] = [a.fecha, b.fecha]; break;
            case 'Hora': [propertyA, propertyB] = [a.hora, b.hora]; break;
            case 'Estado': [propertyA, propertyB] = [a.EstadoCita_id, b.EstadoCita_id]; break;
            case 'Box': [propertyA, propertyB] = [a.BoxConsulta_id, b.BoxConsulta_id]; break;
            case 'Paciente': [propertyA, propertyB] = [a.Paciente_id, b.Paciente_id]; break;
            case 'Medico': [propertyA, propertyB] = [a.Medico_id, b.Medico_id]; break;
          }
        }
        else if(this.filtro === "Diagnostico")
        {
           switch (this._sort.active)
          {
            case 'Diagnostico': [propertyA, propertyB] = [a.diagnostico, b.diagnostico]; break;
          }
        }
        else if(this.filtro === "ViaAdminMed")
        {
           switch (this._sort.active)
          {
            case 'Descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
          }

        }else if(this.filtro === "Ocupacion")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }

        }else if(this.filtro === "Vacuna")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }

        }else if(this.filtro === "ExamenFisico")
        {
           switch (this._sort.active)
          {
            case 'FechaExamen': [propertyA, propertyB] = [a.fechaExamen, b.fechaExamen]; break;
            case 'Peso': [propertyA, propertyB] = [a.peso, b.peso]; break;
            case 'Estatura': [propertyA, propertyB] = [a.estatura, b.estatura]; break;
          }

        }else if(this.filtro === "VacunasPaciente")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "Alergia")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "EnfermedadCronica")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "GrupoEtnico")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "UsoMedicamento")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;


          }
        }
        else if(this.filtro === "HabitosPaciente")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;


          }
        }
        else if(this.filtro === "HabitosSexualesPaciente")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
            
          }
        }

        else if(this.filtro === "Habito")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }

        else if(this.filtro === "HabitoSexual")
        {
           switch (this._sort.active)
          {
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "EnfermedadesCronicasPaciente")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "AlergiasComunesPaciente")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
         else if(this.filtro === "Medicamento")
        {
           switch (this._sort.active)
          {
            case 'NombreComun': [propertyA, propertyB] = [a.nombrecomun, b.nombrecomun]; break;
            case 'NombreCientifico': [propertyA, propertyB] = [a.nombrecientifico, b.nombrecientifico]; break;
          }
        }
         else if(this.filtro === "AlergiasMedicamentosPaciente")
        {
           switch (this._sort.active)
          {
            case 'Rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
            case 'Nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
          }
        }
        else if(this.filtro === "VerAlergiasComunesPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreAlergia': [propertyA, propertyB] = [a.nombreAlergia, b.nombreAlergia]; break;
            
          }
        }
         else if(this.filtro === "VerEnfermedadesCronicasPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreEnfermedad': [propertyA, propertyB] = [a.nombreEnfermedad, b.nombreEnfermedad]; break;
            
          }
        }
         else if(this.filtro === "VerHabitosPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreHabito': [propertyA, propertyB] = [a.nombreHabito, b.nombreHabito]; break;
            
          }
        }
         else if(this.filtro === "VerHabitosSexualesPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreHabitoSexual': [propertyA, propertyB] = [a.nombreHabitoSexual, b.nombreHabitoSexual]; break;
            
          }
        }
        else if(this.filtro === "VerUsoMedicamentosPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreMedicamento': [propertyA, propertyB] = [a.nombreMedicamento, b.nombreMedicamento]; break;
            
          }
        }
        else if(this.filtro === "VerVacunasPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreVacuna': [propertyA, propertyB] = [a.nombreVacuna, b.nombreVacuna]; break;
            
          }
        }
         else if(this.filtro === "VerAlergiasMedicamentosPaciente")
        {
           switch (this._sort.active)
          {
            case 'NombreMedicamento': [propertyA, propertyB] = [a.nombreMedicamento, b.nombreMedicamento]; break;
            
          }
        }





      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
