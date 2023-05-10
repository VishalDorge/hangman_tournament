import { Route } from "./routes.types"
import { ExcludedPath } from "../utility/middleware/token.validate";

import AuthRouter from "../feature-modules/auth/auth.routes";
import WordRouter from "../feature-modules/word/word.routes";
import CategoryRouter from "../feature-modules/category/category.routes";
import TournamentRouter from "../feature-modules/tournament/tournament.routes";
import LeaderboardRouter from "../feature-modules/leaderboard/leaderboard.routes";
import CommentRouter from "../feature-modules/comments/comment.routes";

export const routes: Route[] = [
    new Route("/auth", AuthRouter),
    new Route("/word", WordRouter),
    new Route("/category", CategoryRouter),
    new Route("/tournament", TournamentRouter),
    new Route("/leaderboard", LeaderboardRouter),
    new Route("/comment", CommentRouter)
]

export const excludedPaths: ExcludedPath[] = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/register-player", "POST"),
    new ExcludedPath("/user/:Id", "GET", ["admin"], ["manager"])
]