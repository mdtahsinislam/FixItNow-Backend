"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const PORT = env_1.env.port;
const startServer = async () => {
    try {
        app_1.default.listen(PORT, () => {
            console.log("");
            console.log("=================================");
            console.log(`🚀 FixItNow Server Running`);
            console.log(`🌍 http://localhost:${PORT}`);
            console.log("=================================");
            console.log("");
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map