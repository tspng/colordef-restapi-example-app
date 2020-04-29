const app = require("../server");
const { insertColors, clearDatabase } = require("./helpers");
const supertest = require("supertest");
const request = supertest(app);

afterEach(() => {
  clearDatabase();
});

describe("Test GET API endpoints", () => {
  test("if /api/colors returns empty list on empty db", async () => {
    const response = await request.get("/api/colors");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("if /api/colors returns all colors", async () => {
    const colors = [
      { hex: "000000", name: "black" },
      { hex: "ffffff", name: "white" },
    ];
    insertColors(colors.map((x) => Object.values(x)));
    const response = await request.get("/api/colors");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(colors);
  });

  test("if /api/colors/<hex> returns the color object", async () => {
    const cyan = { hex: "00ffff", name: "cyan" };
    insertColors(Object.values(cyan));
    const response = await request.get(`/api/colors/${cyan.hex}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cyan);
  });
});

describe("Test POST API endpoints", () => {
  test("if adding a new color works", async () => {
    const red = { hex: "ff0000", name: "red" };
    const response = await request.post("/api/colors").send(red);
    expect(response.status).toBe(201);
    expect(response.header).toHaveProperty("location");
  });

  test("if missing data returns HTTP 400", async () => {
    const red = { hex: "ff0000", foobar: "baz" };
    const response = await request.post("/api/colors").send(red);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("if hex field is validated", async () => {
    const wrong = { hex: "fg0000", name: "red" };
    const response = await request.post("/api/colors").send(wrong);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("Test PUT API endpoints", () => {
  test("if /api/colors/<hex> can update the color object", async () => {
    const cyan = { hex: "00ffff", name: "Foobar" };
    insertColors(Object.values(cyan));
    const response = await request
      .put(`/api/colors/${cyan.hex}`)
      .send({ ...cyan, name: "cyan" });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("cyan");
  });

  test("if put on unknown <hex> throws a 404", async () => {
    const response = await request
      .put("/api/colors/000000")
      .send({ hex: "000000", name: "black" });
    expect(response.status).toBe(404);
  });
});

describe("Test DELETE API endpoints", () => {
  test("if /api/colors/<hex> can delete an object", async () => {
    const yellow = { hex: "ffff00", name: "yellow" };
    insertColors(Object.values(yellow));
    const response = await request.delete(`/api/colors/${yellow.hex}`);
    expect(response.status).toBe(200);
    const getResponse = await request.get(`/api/colors/${yellow.hex}`);
    expect(getResponse.status).toBe(404);
  });

  test("if delete on unknown <hex> throws a 404", async () => {
    const response = await request.delete("/api/colors/xxyyzz");
    expect(response.status).toBe(404);
  });
});
