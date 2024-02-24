//This is the mocking server and created by Mirage.js , it contains GET and POST methods.

import { createServer, Model } from "miragejs";

export default function mockServer() {
  createServer({
    models: {
      todo: Model,
    },

    routes() {
      this.get("/api/todos", (schema) => {
        return schema.todos.all();
      });
      //This variable is for generating Id for each Todo
      let newId = 1;
      this.post("/api/todos", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = newId++;

        return schema.todos.create(attrs);
      });
    },
  });
}
