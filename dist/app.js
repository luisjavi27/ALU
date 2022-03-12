"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(router.getcu)
// app.use(saldoController)
app.listen(config_1.default.PORT, () => {
    return console.log(`El Servidor en el puerto ${config_1.default.PORT}`);
});
(0, router_1.default)(app);
//# sourceMappingURL=app.js.map