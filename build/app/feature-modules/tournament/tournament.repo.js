"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tournament_schema_1 = require("./tournament.schema");
const findOne = (filter) => tournament_schema_1.tournamentModel.findOne(Object.assign({ isDeleted: false }, filter));
const create = (tournament) => tournament_schema_1.tournamentModel.create(tournament);
const update = (filter, data) => tournament_schema_1.tournamentModel.updateMany(filter, data);
const aggregation = (pipeline) => tournament_schema_1.tournamentModel.aggregate(pipeline);
exports.default = {
    findOne,
    create,
    update,
    aggregation
};
