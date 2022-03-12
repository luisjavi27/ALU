"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentaController_1 = require("../controllers/cuentaController");
const router = (0, express_1.Router)();
const path = 'getcuenta';
router.get(`/${path}`, cuentaController_1.getCuenta);
exports.default = router;
//# sourceMappingURL=cuenta.js.map