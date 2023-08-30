import { prisma } from "../src/utils";
import request from "supertest";
import Cookies from "expect-cookies";
import { app } from "../src/server";


 /* 
 testing auth endpoints 

 - signup cases (the client should not be allowed to sign up an empty body also should be validated, dispatchers and officers only can be signed up by  superiors)

 -signin cases the form need to be validated, if an existing cookie exists if the user login again a new cookie should be generated..

 -signout if the user is not logged in the endpoint should send a http 200 response, if the endpoint is typed incorretly the server should return a 404 http response, the cookie should be removed if the user is logged in

 */
 describe("signIn, signUp, signOut tests", () => {



    //sign in tests ✨✨
    
    
    describe("sign in controller tests ", () => {
      it("should send an 400 response status if the body is empty or one of the fields are empty", async () => {
        await request(app).post("/auth/signin")
          .expect(400);
      });

  
      it("should send 404 if the route does not exists", async () => {
        await request(app).post("/auth/sing-in")
          .expect(404);
      });
  
      it("if the user is registered we should receive the 201 http and a cookie", async () => {
        await request(app).post("/auth/signin")
          .send({ username: "testUser", password: "testPassword" })
          .expect(Cookies.set({ "name": "jwt", "options": ["httponly"] }))
          .expect(Cookies.not("set", { "name": "bravo" }))
          .expect(201);
      });
  
      it("if passwords does not match the user should not be able to log in also the cookie shouldn't be set", async () => {
        await request(app).post("/auth/signin")
          .send({ username: "testUser", password: "testPassword1" })
          .expect(Cookies.not("set", { "name": "jwt" }))
          .expect(401);
      });
    });


    /// signup tests ✨✨✨
    
    describe("sign Up controller test", () => {
      it("an officer or dispatcher cannot be created without superior permissions", async() => {
        await request(app).post("/auth/signup-officer")
        .send({ username: "testUser", password: "testPassword" })
        .expect(403);
      });


     
  
      it("should send 404 http  code if the route is typed incorrectly", async () => {
        await request(app).post("/auth/singn-up")
          .expect(404);
      });

      
      it("if the  user is   is signed up successfully  the server should store it in the db", async () => {
         await request(app).post("/auth/signin").set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({ username: "testUser", password: "testPassword" })
        .then(async(res) => {

            await request(app).post("/auth/signup-officer").set("Cookie", res.headers["set-cookie"])
          .send({ username: "testOfficer1", password: "testOfficer1", cuip: "1saaa1aaaaaaaaaaaaddsaa11", group:"grouptest12" }).set("Authorization", `Bearer ${res.body.data[0].details.token}`)
          
          .expect(201);
        const newUserCreated = await prisma.user.findUnique({
          where: {
            name: "testOfficer1"
          }
        });
        expect(newUserCreated?.role).toMatch("OFFICER");
          });
        
      });

      it("should send an 403  http reponse status  code if one of the fields or both of them are empty", async () => {
        await request(app).post("/auth/signin")
        .send({ username: "testUser", password: "testPassword" });
        await request(app).post("/auth/signup-officer")
          // the cuip field is empty
          .send({ username: "testUser1", password: "testPassword1" })
          .expect(403);
      });

    });


    /// signOut tests ✨✨✨✨


    describe("sign out controller test", () => {
      it("even if the cookie does not contain a token or the cookie does not exists the endpoint should send a 200 http code response", async () => {
        await request(app).get("/auth/signout")
          .expect(Cookies.not("set", { "name": "jwt" }))
          .expect(200, {
            data: [
              {
                field: "autorizacion",
                details:  "el usuario ha cerrado sesion"
              }
            ]
          });
      });
  
      it("if the user is logged in and he signs out the cookie with the token should be removed", async () => {
        await request(app).post("/auth/signin")
        .send({ username: "testUser", password: "testPassword" })
        .expect(Cookies.set({ "name": "jwt", "options": ["httponly"] }));
        
        await request(app).get("/auth/signout")
        .expect(200)
        // check if the cookie was removed
        .expect(Cookies.not("set", { "name": "jwt" }));
    
      });
  
      it("if the endpoint is typed incorretly the server should return a 404 http response", async() => {
        await request(app).get("/auth/signOtu")
        .expect(404);
      });
    }
    );

     /// token test tests ✨✨✨✨


     describe("token controller test", () => {
      it("if the jwt inside the cookie is not valid we should get an 403 response", async () => {
        await request(app).get("/auth/update-token").set("Cookie", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwicm9sZSI6Ik9GRklDRVIifQ.qTgJVyBHb48NKa6wOdFkMTOPorTof3bIPwCbjwjxTNs").expect(401);
        
      });
  
      it("if the cookie is valid we should get an acess token", async () => {
        await request(app).post("/auth/signin")
        .send({ username: "testUser", password: "testPassword" })
        .then(async(res) => {
          await request(app).get("/auth/update-token").set("Cookie", res.headers["set-cookie"]).expect(201);
        });
      });


  
      it("if a token is tried to be updated more than 2 times in less than a minute we should get an too many  requests  response", async() => {
        await request(app).post("/auth/signin")
        .send({ username: "testUser", password: "testPassword" })
        .then(async(res) => {
          await request(app).get("/auth/update-token").set("Cookie", res.headers["set-cookie"]);
          await request(app).get("/auth/update-token").set("Cookie", res.headers["set-cookie"]);
          await request(app).get("/auth/update-token").set("Cookie", res.headers["set-cookie"]);
          await request(app).get("/auth/update-token").set("Cookie", res.headers["set-cookie"]).expect(429);
        });
      });
    
    }
    
    );

  });