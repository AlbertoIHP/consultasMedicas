"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
var SUPPORTS_INTL_API = typeof Intl !== 'undefined';
var EspDateAdapter = /** @class */ (function (_super) {
    __extends(EspDateAdapter, _super);
    function EspDateAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.useUtcForDisplay = true;
        return _this;
    }
    EspDateAdapter.prototype.parse = function (value) {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            var str = value.split('/');
            var year = Number(str[2]);
            var month = Number(str[1]) - 1;
            var date = Number(str[0]);
            return new Date(year, month, date);
        }
        var timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    // to be removed when mmalerba merge the mods in the next beta
    EspDateAdapter.prototype.format = function (date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            if (this.useUtcForDisplay) {
                date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
                displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
            }
            var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return dtf.format(date).replace(/[\u200e\u200f]/g, '');
        }
    };
    return EspDateAdapter;
}(material_1.NativeDateAdapter));
exports.EspDateAdapter = EspDateAdapter;
//# sourceMappingURL=EspDateAdapter.js.map