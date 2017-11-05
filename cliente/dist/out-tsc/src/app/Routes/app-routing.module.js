"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var homemp_component_1 = require("../Components/moduloPacientes/homemp.component");
var login_component_1 = require("../Components/login/login.component");
//Se importan todos los modulos a rutear
//Se declaran como constantes todas las rutas con sus respectivos nombres
var routes = [
    //Login como pagina principal
    { path: '', component: login_component_1.LoginComponent },
    //Rutas MODULO
    //MODULO PACIENTES
    { path: 'moduloPacientes', component: homemp_component_1.Homemp },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map