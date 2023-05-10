"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const routes_types_1 = require("./routes.types");
const token_validate_1 = require("../utility/middleware/token.validate");
const auth_routes_1 = __importDefault(require("../feature-modules/auth/auth.routes"));
const word_routes_1 = __importDefault(require("../feature-modules/word/word.routes"));
const category_routes_1 = __importDefault(require("../feature-modules/category/category.routes"));
const tournament_routes_1 = __importDefault(require("../feature-modules/tournament/tournament.routes"));
const leaderboard_routes_1 = __importDefault(require("../feature-modules/leaderboard/leaderboard.routes"));
const comment_routes_1 = __importDefault(require("../feature-modules/comments/comment.routes"));
exports.routes = [
    new routes_types_1.Route("/auth", auth_routes_1.default),
    new routes_types_1.Route("/word", word_routes_1.default),
    new routes_types_1.Route("/category", category_routes_1.default),
    new routes_types_1.Route("/tournament", tournament_routes_1.default),
    new routes_types_1.Route("/leaderboard", leaderboard_routes_1.default),
    new routes_types_1.Route("/comment", comment_routes_1.default)
];
exports.excludedPaths = [
    new token_validate_1.ExcludedPath("/auth/login", "POST"),
    new token_validate_1.ExcludedPath("/auth/register-player", "POST"),
    new token_validate_1.ExcludedPath("/user/:Id", "GET", ["admin"], ["manager"])
];
