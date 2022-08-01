import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../index";
import { generateToken } from "../utils";

chai.use(chaiHttp);
chai.should();

describe("Job", () => {
  const token = generateToken({
    name: "freelancer",
    password: "password",
  });

  describe("token check", () => {
    it("should login success", (done) => {
      chai
        .request(app)
        .post("/api/job")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "dfdfdfdfdf",
          description: "dddfdfdfdfd",
          rate: 10,
          status: "excellent",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          console.error("res", res);
          done(err);
        });
    });

    it("validation error", (done) => {
      chai
        .request(app)
        .post("/api/job")
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "Test Job Description",
          status: "Test Status",
          rate: 2000,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Get job/", () => {
    it("should get jobs success", (done) => {
      chai
        .request(app)
        .get("/api/job")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        });
    });
  });
  describe("Put job/:id/approved", () => {
    it("should approved job success", (done) => {
      chai
        .request(app)
        .put("/api/job/2/approved")
        .set("Authorization", `Bearer ${token}`)
        .send({
          approved: true,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          done();
        });
    });
  });
});
