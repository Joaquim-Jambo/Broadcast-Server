#!/usr/bin/env node
import dotenv from "dotenv"

dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });
import "../cli/index.js";
import "../client/index.js";
import "../server/index.js";
