import { FastifyPluginCallback } from "fastify";
import * as uuid from "uuid";
import fp from "fastify-plugin";
import { RunWithRequestId } from "../request-id";

const REQUEST_ID_HEADER_NAME = "request-id";

export function runWithRequestIdPlugin(deps: {
  runWithRequestId: RunWithRequestId;
}): FastifyPluginCallback {
  const plugin: FastifyPluginCallback = (fastify, _, next) => {
    fastify.addHook("onRequest", (request, _reply, callback) => {
      const requestId =
        request.headers[REQUEST_ID_HEADER_NAME]?.toString() ?? uuid.v4();

      return deps.runWithRequestId(requestId, callback);
    });

    next();
  };

  return fp(plugin);
}
