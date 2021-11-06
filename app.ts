import { parseArgs } from "./deps.ts";
import { searchInDB } from "./search.ts"
const { args, listen, serveHttp } = Deno;
const port = parseArgs(args).port;
const listener = listen({ port });
console.log(`http://localhost:${port}/`);

for await (const conn of listener) {
  (async () => {
    const requests = serveHttp(conn);
    for await (const { respondWith, request } of requests) {
      const reauestURL = new URL(request.url)
      const searchQuery = reauestURL.searchParams.get("q")
      const dbs = reauestURL.searchParams.get("dbs") as string
      console.log(dbs)
      respondWith(
        
        new Response(JSON.stringify(await searchInDB(searchQuery, dbs)), {
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }),

        }),
      );
    }
  })();
}
