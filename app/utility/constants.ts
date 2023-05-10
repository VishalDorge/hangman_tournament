export const roles = {
    ADMIN: "6440345a219c5d62b92480ad",
    PLAYER: "6440346b219c5d62b92480ae"
}

export const statuses = {
    PENDING: "6444a6a3046d33346d534c4a",
    APPROVED: "6444a6b3046d33346d534c4b",
    REJECTED: "6444a6c6046d33346d534c4c"
}

export const levels = {
    EASY: "6455ebd43cbcad9d97dd470a",
    MEDIUM: "6455ebe03cbcad9d97dd470b",
    HARD: "6455ebed3cbcad9d97dd470c",
}

export const Admins = {
    ADMIN: "6455ee6a61ca8f8b1b50cbdd"
}

export const statusesData = [
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
]

export const rolesData = [
    {
        _id: "6440345a219c5d62b92480ad",
        name: "admin"
    },
    {
        _id: "6440346b219c5d62b92480ae",
        name: "player"
    }
]

export const levelData = [
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
]

export const adminData = {
    username: "admin",
    email: "admin@gmail.com",
    password: "12345",
    isModerator: true
}

import {ParsedQs} from "qs";
export type customQuery = Record<string, string | string[] | ParsedQs | ParsedQs[] | undefined>