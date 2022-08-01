import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

chai.use(chaiHttp);
chai.should();

describe("Login", () => {
  describe("Post /login", () => {
    it("should login success", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({ name: "james", password: "password" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          expect(res.body.user.token).to.be.a("string");
          done();
        });
    });
    it("should login fail", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({ name: "james", password: "fake" })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});
