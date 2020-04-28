const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe("Test API endpoints", () => {
  it("Gets the test endpoint", async (done) => {
    // Sends GET Request to / endpoint
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
    done();
  });
});
