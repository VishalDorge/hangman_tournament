import { config } from "dotenv";
config();

import { startServer } from "./app/app";
startServer();

import { populate } from "./app/utility/populate.db";
populate();