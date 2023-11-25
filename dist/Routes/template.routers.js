"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const template_controllers_1 = require("../Controllers/template.controllers");
const routers = express_1.default.Router();
routers.get("/", template_controllers_1.Get);
routers.post("/", template_controllers_1.Post);
exports.default = routers;
