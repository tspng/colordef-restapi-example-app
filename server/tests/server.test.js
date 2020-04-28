const app = require("../server");
const helpers = require("./helpers");
const supertest = require("supertest");
const request = supertest(app);

afterEach(() => {
  helpers.clearDatabase();
});

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

describe("Test POST API endpoints", () => {
  test("if adding a new color works", async (done) => {
    const color = { hex: "ff0000", name: "red" };
    const response = await request.post("/colors").send(color);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(color);
    done();
  });

  test("if missing data returns HTTP 400", async (done) => {
    const color = { hex: "ff0000", foobar: "baz" };
    const response = await request.post("/colors").send(color);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    done();
  });
});
