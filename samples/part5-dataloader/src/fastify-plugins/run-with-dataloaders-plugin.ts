import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { RunWithDataLoaders } from "../dataloader";

export function runWithDataLoadersPlugin(deps: {
  runWithDataLoaders: RunWithDataLoaders;
}): FastifyPluginCallback {
  const plugin: FastifyPluginCallback = (fastify, _, next) => {
    fastify.addHook("onRequest", (_request, _reply, callback) => {
      deps.runWithDataLoaders(callback);
    });

    next();
  };

  return fp(plugin);
}
