import { Elysia } from "elysia";
import { drizzle } from 'drizzle-orm/node-postgres'

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);
const db = drizzle(process.env.DATABASE_URL!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
