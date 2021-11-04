const request = require("supertest");
const app = require("../app");

// Create asset
test("Create asset", async () => {
  const res = await request(app)
    .post("/aas")
    .send({
      description: "Welle",
    })
    .expect(201);

  const asset = await Asset.findById(res.body._id);
  expect(asset).not.toBeNull();
  expect(asset.isAvailable).toBe(false);
});
