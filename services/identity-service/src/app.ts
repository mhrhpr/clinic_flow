import Fastify from "fastify";
import { identityRoutes } from "./http/identityRoutes.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  app.register(identityRoutes);
  return app;
}
