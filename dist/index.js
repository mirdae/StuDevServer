"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./db");
dotenv_1.default.config();
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT  : ${PORT}`));
