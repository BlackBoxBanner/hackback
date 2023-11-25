"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//SECTION - import
//NOTE - ExpressJS
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
//NOTE - Router
const template_routers_1 = __importDefault(require("./Routes/template.routers"));
const default_routers_1 = __importDefault(require("./Routes/v1/default.routers"));
//NOTE - Socker.io
const http_1 = require("http");
//NOTE - ENV
require("dotenv/config");
//!SECTION
if (!process.env.WEB_ORIGIN) {
    new Error("There is no WEB_ORIGIN in the .env file.");
}
//SECTION - express
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.WEB_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
}));
app.enable('trust proxy');
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
//NOTE - declare routes
app.use("/", default_routers_1.default);
app.use("/template", template_routers_1.default);
//!SECTION
//SECTION - socket
const server = (0, http_1.createServer)(app);
//!SECTION
//SECTION - start application
const port = process.env.PORT;
server.listen(port, () => console.log(`Application is running on port ${port}`));
//!SECTION
