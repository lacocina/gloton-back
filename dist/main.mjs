import fastify from "fastify";
const registerUserRoutes = (app2, opts, next) => {
  app2.get("/", async () => "Hello World!");
  next();
};
const app$1 = fastify();
app$1.register(registerUserRoutes, { prefix: "/users" });
app$1.get("/", async () => "Hello World!");
console.log("Starting servers...");
{
  app$1.listen({ port: 3e3 });
}
const app = app$1;
export {
  app
};
