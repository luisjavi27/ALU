"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.decodeSign = exports.tokenSign = void 0;
const jwt = require('jsonwebtoken');
const config_1 = __importDefault(require("../config/config"));
const tokenSign = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jwt.sign({
        _id: user.correo,
        role: user.role
    }, 
    // process.env.JWT_SECRET, 
    config_1.default.JWT_SECRET, {
        expiresIn: "1h",
    });
});
exports.tokenSign = tokenSign;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jwt.verify(token, config_1.default.JWT_SECRET);
    }
    catch (e) {
        return null;
    }
});
exports.verifyToken = verifyToken;
const decodeSign = (token) => {
    return jwt.decode(token, null);
};
exports.decodeSign = decodeSign;
//# sourceMappingURL=generateToken.js.map