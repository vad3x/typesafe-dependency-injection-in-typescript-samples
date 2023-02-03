import { NodeRequest } from "@whatwg-node/server";

import { FastifyPluginCallback } from "fastify";

export type HandleNodeRequest = (
  nodeRequest: NodeRequest
) => Promise<Response> | Response;

export function graphqlRoutes({
  handleGraphQLNodeRequest,
}: {
  handleGraphQLNodeRequest: HandleNodeRequest;
}): FastifyPluginCallback {
  return (fastify, _, next) => {
    fastify.route({
      url: "/graphql",
      method: ["GET", "POST", "OPTIONS"],
      handler: async (req, reply) => {
        const response = await handleGraphQLNodeRequest(req);

        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        reply.status(response.status);

        reply.send(response.body);

        return reply;
      },
    });

    next();
  };
}
