const app = require("../server");
const helpers = require("./helpers");
const supertest = require("supertest");
const request = supertest(app);

describe("Test GET API endpoints", () => {
  test("if /colors returns empty list on empty db", async (done) => {
    const response = await request.get("/colors");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    done();
  });

  test("if /colors returns all colors", async (done) => {
    const colors = [
      { hex: "000000", name: "black" },
      { hex: "ffffff", name: "white" },
    ];
    helpers.insertColors(colors.map((x) => Object.values(x)));
    const response = await request.get("/colors");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(colors);
    done();
  });
});
