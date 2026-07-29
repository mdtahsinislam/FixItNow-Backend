"use strict";
// //D:\FixItNow-Backend\src\app.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import router from "./routes";
// import notFound from "./middlewares/notFound";
// import errorHandler from "./middlewares/errorHandler";
// const app: Application = express();
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.get("/", (_req: Request, res: Response) => {
//   res.status(200).json({
//     success: true,
//     message: "Welcome to FixItNow Backend API",
//   });
// });
// app.use("/api/v1", router);
// app.use(notFound);
// app.use(errorHandler);
// export default app;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
/**
 * Middlewares
 */
app.use((0, cors_1.default)({
    origin: true, // পরে Frontend URL দিব
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cookie_parser_1.default)());
/**
 * Root Route
 */
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to FixItNow Backend API",
    });
});
/**
 * API Routes
 */
app.use("/api/v1", routes_1.default);
/**
 * Not Found Middleware
 */
app.use(notFound_1.default);
/**
 * Global Error Handler
 */
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map