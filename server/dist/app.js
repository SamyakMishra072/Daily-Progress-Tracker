"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const entries_1 = __importDefault(require("./routes/entries"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' })); // adjust if your frontend URL differs
app.use(express_1.default.json());
app.use('/api/entries', entries_1.default);
app.get('/', (_req, res) => {
    res.send('🟢 Track Samyak backend is running');
});
exports.default = app;
