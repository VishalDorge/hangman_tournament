"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPipeline = void 0;
const mongoose_1 = require("mongoose");
const convert_1 = require("./convert");
class CustomPipeline {
    constructor(query, options = {}) {
        this.pipeline = [];
        this.pagination = (pageNo, limitItems) => {
            const page = parseInt(pageNo) || 1;
            const limit = parseInt(limitItems) || 3;
            const offset = (page - 1) * limit;
            this.pipeline.push({ $skip: offset }, { $limit: limit });
            return this;
        };
        this.lookupStage = (populateFrom, localFieldName, foreignFieldName, finalFieldName) => {
            this.pipeline.push({
                $lookup: {
                    from: populateFrom,
                    localField: localFieldName,
                    foreignField: foreignFieldName,
                    as: finalFieldName
                }
            });
            return this;
        };
        this.selectStage = (...fieldsToHide) => {
            fieldsToHide.forEach(field => {
                this.pipeline.push({
                    $unset: field
                });
            });
            return this;
        };
        this.matchStage = (filter) => {
            this.pipeline.push({
                $match: { isDeleted: false }
            });
            for (let field in filter) {
                if (typeof filter[field] === "object") {
                    this.pipeline.push({
                        $match: {
                            [field]: filter[field]
                        }
                    });
                }
                else if (Array.isArray(filter[field])) {
                    this.pipeline.push({
                        $match: {
                            [field]: { $in: filter[field] }
                        }
                    });
                }
                else {
                    if (filter[field].length > 20) {
                        this.pipeline.push({
                            $match: {
                                [field]: new mongoose_1.Types.ObjectId(filter[field])
                            }
                        });
                    }
                    else {
                        this.pipeline.push({
                            $match: {
                                [field]: filter[field]
                            }
                        });
                    }
                }
            }
            return this;
        };
        this.unWindStage = (fieldName) => {
            this.pipeline.push({
                $unwind: "$" + fieldName
            });
            return this;
        };
        this.sortStage = (sortBy, sortOrder) => {
            this.pipeline.push({
                $sort: {
                    [sortBy]: sortOrder === 'desc' ? -1 : 1
                }
            });
            return this;
        };
        const deafultOptions = {
            matchStage: true,
            sortState: true,
            pagination: true
        };
        options = Object.assign(Object.assign({}, deafultOptions), options);
        const { page, limit, sortBy, sortOrder } = query, filter = __rest(query, ["page", "limit", "sortBy", "sortOrder"]);
        (0, convert_1.convertValuesToOriginalType)(filter);
        options.matchStage ? this.matchStage(filter) : null;
        options.sortStage ? this.sortStage(sortBy, sortOrder) : null;
        options.pagination ? this.pagination(page, limit) : null;
    }
    generate() {
        return this.pipeline;
    }
    ;
}
exports.CustomPipeline = CustomPipeline;
