"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Componentes generales
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var custom_date_formatter_1 = require("../../../Globals/custom-date-formatter");
var angular_calendar_1 = require("angular-calendar");
var forms_1 = require("@angular/forms");
var feriado_service_1 = require("../../../../Services/feriado/feriado.service");
var EditarferiadoComponent = /** @class */ (function () {
    function EditarferiadoComponent(dialogRef, data, servicioFeriado) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioFeriado = servicioFeriado;
        //Atributos para manejar el calendario (idioma, distribución de los días)
        this.viewDate = new Date();
        this.locale = 'es';
        this.weekStartsOn = angular_calendar_1.DAYS_OF_WEEK.MONDAY;
        this.weekendDays = [angular_calendar_1.DAYS_OF_WEEK.SATURDAY, angular_calendar_1.DAYS_OF_WEEK.SUNDAY];
        this.events = [];
        this.fechaSeleccionada = true;
        // Se obtienen los datos provistos al dar click en el botón del feriado a editar
        this.feriado = data.feriado;
        var dia = this.feriado.dia.split(' ')[0];
        console.log(dia);
        if (dia === 'Domingo') {
            dia = 'Sun';
        }
        else if (dia === 'Lunes') {
            dia = 'Mon';
        }
        else if (dia === 'Martes') {
            dia = 'Tue';
        }
        else if (dia === 'Miercoles') {
            dia = 'Wed';
        }
        else if (dia === 'Jueves') {
            dia = 'Thu';
        }
        else if (dia === 'Viernes') {
            dia = 'Fri';
        }
        else if (dia === 'Sabado') {
            dia = 'Sat';
        }
        //this.dia.date.setFullYear(parseInt(this.feriado.dia.split(' ')[0]), parseInt(this.feriado.dia.split(' ')[1], parseInt(this.feriado.dia.split(' ')[2])));
        //this.selectedDay = new Date(this.feriado.dia);
        //this.selectedDay.date = new Date(this.feriado.dia);
        console.log(this.selectedDay);
        //this.selectedDay = dia + ' ' + this.feriado.dia.split('/')[1] + ' ' + this.feriado.dia.split('/')[0].split(' ')[1] + ' ' + this.feriado.dia.split('/')[2];
        //console.log(this.selectedDay.date);
        //this.selectedDay.date.setFullYear(parseInt(this.feriado.dia.split(' ')[0]), parseInt(this.feriado.dia.split(' ')[1], parseInt(this.feriado.dia.split(' ')[2])));
    }
    EditarferiadoComponent.prototype.ngOnInit = function () {
        //Se crea el nuevo formulario grupal, dentro se agregan los atributos que se conrtrolarán    	
        this.editarForm = new forms_1.FormGroup({
            //Los parámetros que se le dan, validan como se mostrarán al iniciar y que se use de forma correcta
            descripcion: new forms_1.FormControl(this.feriado.descripcion, [forms_1.Validators.required]),
        });
    };
    EditarferiadoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarferiadoComponent.prototype.editarFeriado = function () {
        var _this = this;
        this.servicioFeriado.editFeriado(this.feriado, this.feriado.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditarferiadoComponent.prototype.dayClicked = function (day) {
        this.selectedDay.date = new Date(this.feriado.dia);
        console.log(this.selectedDay.date);
        if (this.selectedDay) {
            delete this.selectedDay.cssClass;
        }
        this.selectedDay = day;
        if (this.selectedDay.isFuture) {
            this.fechaSeleccionada = false;
            day.cssClass = 'cal-day-selected';
            var dia = this.selectedDay.date.toString().split(' ')[0];
            if (dia === 'Sun') {
                dia = 'Domingo';
            }
            else if (dia === 'Mon') {
                dia = 'Lunes';
            }
            else if (dia === 'Tue') {
                dia = 'Martes';
            }
            else if (dia === 'Wed') {
                dia = 'Miercoles';
            }
            else if (dia === 'Thu') {
                dia = 'Jueves';
            }
            else if (dia === 'Fri') {
                dia = 'Viernes';
            }
            else if (dia === 'Sat') {
                dia = 'Sabado';
            }
            this.feriado.dia = dia + ' ' + this.selectedDay.date.toString().split(' ')[2] + '/' + this.selectedDay.date.toString().split(' ')[1] + '/' + this.selectedDay.date.toString().split(' ')[3];
        }
        else {
            alert("Ha seleccionado una fecha pasada");
        }
    };
    EditarferiadoComponent.prototype.beforeMonthViewRender = function (_a) {
        var _this = this;
        var body = _a.body;
        body.forEach(function (day) {
            if (_this.selectedDay && day.date.getTime() === _this.selectedDay.date.getTime()) {
                day.cssClass = 'cal-day-selected';
                _this.selectedDay = day;
            }
        });
    };
    EditarferiadoComponent = __decorate([
        core_1.Component({
            selector: 'app-editarferiado',
            templateUrl: './editarferiado.component.html',
            styleUrls: ['./editarferiado.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                {
                    provide: angular_calendar_1.CalendarDateFormatter,
                    useClass: custom_date_formatter_1.CustomDateFormatter
                }
            ]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, feriado_service_1.FeriadoService])
    ], EditarferiadoComponent);
    return EditarferiadoComponent;
}());
exports.EditarferiadoComponent = EditarferiadoComponent;
//# sourceMappingURL=editarferiado.component.js.map