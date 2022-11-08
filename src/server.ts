import fastify, { FastifyError, FastifyRequest } from "fastify";

import userHandler from "./modules/user/routes";
import cors from "@fastify/cors";
import { fastifyStatic } from "@fastify/static";
import fastifyMulter from "fastify-multer";
import path from "path";
import EnvService from "./utils/EnvService";
import { FastifyReply } from "fastify";
import coworkingHandler from "./modules/coworking/routes";

export class Server {
  private static server;

  private static apiPrefix: string = EnvService.getEnv("API_PREFIX", "api");

  /**
   *
   * @returns server
   */
  public static createServer() {

    this.server = fastify();

    //cors
    this.server.register(cors);

    //static
    this.server.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
      prefix: "/public/", // optional: default '/'
    });

    // register fastify content parser
    this.server.register(fastifyMulter.contentParser);

    //this.initStorage();
    this.declareEndPoints();
    this.handleError();

    return this.server;
  }

  /**
   *
   */
  private static declareEndPoints() {
    this.server.register(userHandler, { prefix: `${this.apiPrefix}` });
    this.server.register(coworkingHandler, { prefix: `${this.apiPrefix}` });
  }

  /**
   *
   */
  private static handleError() {
    this.server.setErrorHandler(
      (error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
        const statusCode = error?.statusCode || 500;
        req.log.error(error.toString());
        res.code(statusCode).send({ error });
      }
    );
  }
}
