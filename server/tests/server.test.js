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

  test("if /colors/<hex> returns the color object", async (done) => {
    const cyan = { hex: "00ffff", name: "cyan" };
    helpers.insertColors(Object.values(cyan));
    const response = await request.get(`/colors/${cyan.hex}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cyan);
    done();
  });
});

describe("Test POST API endpoints", () => {
  test("if adding a new color works", async (done) => {
    const color = { hex: "ff0000", name: "red" };
    const response = await request.post("/colors").send(color);
    expect(response.status).toBe(201);
    expect(response.header).toHaveProperty("location");
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

describe("Test PUT API endpoints", () => {
  test("if /colors/<hex> returns the color object", async (done) => {
    const cyan = { hex: "00ffff", name: "Foobar" };
    helpers.insertColors(Object.values(cyan));
    const response = await request
      .put(`/colors/${cyan.hex}`)
      .send({ ...cyan, name: "cyan" });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("cyan");
    done();
  });
});
