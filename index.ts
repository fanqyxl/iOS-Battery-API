import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

const update = t.Object({
  level: t.Number(),
});

const app = new Elysia()
  .state("battery", null as { device: string; level: number } | null)
  .use(cors())
  .group("/api", (app) =>
    app
      .onBeforeHandle(({ headers, set }) => {
        const auth = headers["authorization"];
        if (!auth || !auth.startsWith("Bearer ")) {
          set.status = 401;
          return { error: "Unauthorized" };
        }
        const token = auth.split(" ")[1];
        if (token !== API_KEY) {
          set.status = 401;
          return { error: "Unauthorized" };
        }
      })
      .post(
        "/update/macbook",
        ({ body, store }) => {
          store.battery = {
            device: "MacBook Pro",
            level: body.level,
          };
          return { sent: body };
        },
        { body: update }
      )
  )
  .get("/api/status", ({ store }) =>
    store.battery
      ? { battery: store.battery }
      : { error: "Battery info not sent yet" }
  )
  .listen({ port: 3000 });

console.log(`Running at localhost:${app.server?.port}`);
