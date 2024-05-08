const request = require("supertest");
const app = require('../index')

describe("GET /question", () => {
  test("should respond with a 200 status code", async () => {
    const resp = await request(app)
      .get("/question")
      .send();
    console.log(resp);
  });
});
