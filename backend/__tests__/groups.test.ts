import { prisma } from "../src/utils";
import request from "supertest";
import Cookies from "expect-cookies";
import { app } from "../src/server";


 /* 
 testing group validations endpoints 

 - create group we should verfiy that an post request cannot success without a body also groups names need to be unique otherwise the response should be a 409 http code error,

 -get group , if the group does not exists we should get an 404 response, if the group does exists we should get the group..

 -signout if the user is not logged in the endpoint should send a http 200 response, if the endpoint is typed incorretly the server should return a 404 http response, the cookie should be removed if the user is logged in

 */
describe("groups endpoints testing", () => {

      //create groups  tests ✨✨

    describe("create groups route  / ", () => {
     it("if the request is send without a  body the response should be a http 400 error", async() => {
        await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
          await request(app).post("/groups").set("Cookie", res.headers["set-cookie"]).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(400);
        });
     });   


     it("if the request tries to create a group with the same name the status code should be a 409 error",async() => {
      await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
         //the group that we are trying to create is not new because we added the group in the setupTests file ✨✨
        await request(app).post("/groups").set("Cookie", res.headers["set-cookie"]).send({
          name:"grouptest12",
          area:"testArea12"
        }).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(409);
      });
     });
     

     
     it("if the body is valid and the group does not exists the client will receive a 201 http code it means the group was created", async() => {
      await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
        //the group that we are trying to create is not new because we added the group in the setupTests file ✨✨
       await request(app).post("/groups").set("Cookie", res.headers["set-cookie"]).send({
         name:"grouptest64",
         area:"testArea64"
       }).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(201);
     });
    });



    it("if the request does not contain credentials we should get an 403 http status code", async() => {
      await request(app).post("/groups").send({
        name:"grouptest12",
        area:"testArea12"
      }).expect(403);
    });
    });

    //get Group tests ✨✨

    describe("get an specific group test /:group ", () => {
      it("if the group does not exists we should get the 404 response code it means the resouce does not exists", async() => {
        await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
            await request(app).get("/groups/group500").set("Cookie", res.headers["set-cookie"]).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(404);
        });
      });


      it("if the group exists we shoould get an http 200 status  code with the group data", async() => {
        await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {

          //the group exists we should get the an 200 http status code
            await request(app).get("/groups/grouptest64").set("Cookie", res.headers["set-cookie"]).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(200);
        });
      });

      it("if the request to get an group does not contain credentials we should get an 403 http status code", async() => {
          //we cant access a group if we dont send the credentials 
        await request(app).get("/groups/grouptest12").expect(403);
      });
      });

    
    //get Groups tests ✨✨
    
    describe("get all groups /", () => {
      it("get all groups", async() =>{
        await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
          await request(app).get("/groups").set("Cookie", res.headers["set-cookie"]).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(200);
        });
      });



      it("we cant get all the groups if the we dont send the crendetials", async() =>{
        await request(app).get("/groups/").expect(403);
      });
    });



    //update groups test ✨✨

    describe("update groups /", () => {
      it("if we try to update a  group  that does not exists we should receive an 404 response", async() => {
        await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
          await request(app).put("/groups").set("Cookie", res.headers["set-cookie"]).send({
            name:"grupo beta1",
            newName:"grupo alfa",
            area:"testing area and development area"
          }).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(404);
        });
      });

      it("if the groups exists and we send all the body fields required the group will be updated", async() => {
        await request(app).post("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
          await request(app).put("/groups/").set("Cookie", res.headers["set-cookie"]).send({
            name:"grouptest12",
            newName:"grouptest13",
            area:"testing area and development area"
          }).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(200);
        });
      });

      it("we cant update a group without crendtials so we should  get an 403 response ", async() => {
        await request(app).put("/groups").send({
          name:"grouptest12",
          newName:"grouptest13",
          area:"testing area and development area"
        }).expect(403);
      });
    });

    //update user groups ✨✨


    describe("update user group /update-user-group", () => {
      it("if the user does not exists we should get a 400 http status code as response", async() => {
        await request(app).put("/auth/signin").send({username:"testUser", password:"testPassword"}).then(async(res) => {
          await request(app).put("/groups/update-user-group").set("Cookie", res.headers["set-cookie"]).send({
            name:"grouptest12",
            username:"testinguSER"
          }).set("Authorization", `Bearer ${res.body.data[0].details.token}`).expect(404);
        });
      });
    });
    });

