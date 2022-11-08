import { Address } from "cluster";
import { Server } from "./server";
import EnvService from "./utils/EnvService";
import dotenv from "dotenv";

dotenv.config();
const server = Server.createServer();

server.listen(
  {
    port: process.env.PORT,
    host: EnvService.getEnv("HOST", "localhost"),
  },
  (err: Error, address: Address) => {
    if (err) throw err;
    console.log(`server listening on ${address}`);
  }
);

module.exports = server;
