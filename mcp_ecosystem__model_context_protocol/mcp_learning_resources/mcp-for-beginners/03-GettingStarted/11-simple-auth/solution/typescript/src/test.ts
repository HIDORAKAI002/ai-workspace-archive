
// used to test the token in .env

import { config } from "dotenv";
import { verifyToken } from "./util.js";

config();

let decodedToken = verifyToken(process.env.token || "");
console.log("Decoded Token:", decodedToken);
console.log("User exist", ["User usersson", "user1"].includes(decodedToken?.name || ""));

console.log("Token from .env:", process.env.token);