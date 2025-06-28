"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const mongoose_1 = require("mongoose");
const entrySchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    tasksCompleted: { type: String, required: true },
    satisfied: { type: String, enum: ['Y', 'N'], required: true },
    remarks: { type: String }
}, { timestamps: true });
exports.Entry = (0, mongoose_1.model)('Entry', entrySchema);
