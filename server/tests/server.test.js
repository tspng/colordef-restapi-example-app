const app = require("../server");
const db = require("../database");
const supertest = require("supertest");
const request = supertest(app);

describe("Test GET API endpoints", () => {
  test("if /colors returns empty list", async (done) => {
    const response = await request.get("/colors");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    done();
  });
});
