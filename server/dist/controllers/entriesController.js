"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.createEntry = exports.getAllEntries = void 0;
const Entry_1 = require("../models/Entry");
const getAllEntries = async (_req, res) => {
    const entries = await Entry_1.Entry.find().sort({ date: -1 });
    res.json(entries);
};
exports.getAllEntries = getAllEntries;
const createEntry = async (req, res) => {
    const { date, tasksCompleted, satisfied, remarks } = req.body;
    const entry = new Entry_1.Entry({ date, tasksCompleted, satisfied, remarks });
    await entry.save();
    res.status(201).json(entry);
};
exports.createEntry = createEntry;
const updateEntry = async (req, res) => {
    const entry = await Entry_1.Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry)
        return res.status(404).json({ message: 'Not found' });
    res.json(entry);
};
exports.updateEntry = updateEntry;
const deleteEntry = async (req, res) => {
    const entry = await Entry_1.Entry.findByIdAndDelete(req.params.id);
    if (!entry)
        return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
};
exports.deleteEntry = deleteEntry;
