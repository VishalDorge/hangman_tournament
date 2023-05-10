"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminData = exports.levelData = exports.rolesData = exports.statusesData = exports.Admins = exports.levels = exports.statuses = exports.roles = void 0;
exports.roles = {
    ADMIN: "6440345a219c5d62b92480ad",
    PLAYER: "6440346b219c5d62b92480ae"
};
exports.statuses = {
    PENDING: "6444a6a3046d33346d534c4a",
    APPROVED: "6444a6b3046d33346d534c4b",
    REJECTED: "6444a6c6046d33346d534c4c"
};
exports.levels = {
    EASY: "6455ebd43cbcad9d97dd470a",
    MEDIUM: "6455ebe03cbcad9d97dd470b",
    HARD: "6455ebed3cbcad9d97dd470c",
};
exports.Admins = {
    ADMIN: "6455ee6a61ca8f8b1b50cbdd"
};
exports.statusesData = [
    {
        _id: "6444a6a3046d33346d534c4a",
        name: "pending"
    },
    {
        _id: "6444a6b3046d33346d534c4b",
        name: "approved"
    },
    {
        _id: "6444a6c6046d33346d534c4c",
        name: "rejected"
    }
];
exports.rolesData = [
    {
        _id: "6440345a219c5d62b92480ad",
        name: "admin"
    },
    {
        _id: "6440346b219c5d62b92480ae",
        name: "player"
    }
];
exports.levelData = [
    {
        _id: "6455ebed3cbcad9d97dd470a",
        name: "easy"
    },
    {
        _id: "6455ebed3cbcad9d97dd470b",
        name: "medium"
    },
    {
        _id: "6455ebed3cbcad9d97dd470c",
        name: "hard"
    }
];
exports.adminData = {
    username: "admin",
    email: "admin@gmail.com",
    password: "12345",
    isModerator: true
};
