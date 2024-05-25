import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req) {
    const apiUrl = Deno.env.get("KAIHEI_API_URL") +
      "/local/query";

    const response = await fetch(
      apiUrl,
    );
    const data = await response.json();

    return new Response(JSON.stringify(data));
  },
};
