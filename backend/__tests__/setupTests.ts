import request from "supertest";
import { app } from "../src/server";
import { prisma } from "../src/utils";
import { redis } from "../src/utils";
beforeAll(async () => {
    await request(app).post("/auth/signup-superior")
      .send({
        username: "testUser",
        password: "testPassword",
        cuip: "dsaaaaaaaaaaaaaaaaddsaad1",
      });
      
      
      
      await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"})
      .then(async(res) => {
        await request(app).post("/groups").set("Cookie", res.headers["set-cookie"])
        .send({
          name:"grouptest12",
          area:"testArea"
        }).set("Authorization",`Bearer ${res.body.data[0].details.token}`);
      });
      await redis.flushdb();
  });
  
  afterAll(async () => {

    // flush the Redis database
redis.flushall((err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Redis database flushed successfully");
  }
});

    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await prisma.group.deleteMany();
    console.log("✨ prisma disconnected!");
 });
  
