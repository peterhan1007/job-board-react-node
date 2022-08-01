import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

chai.use(chaiHttp);
chai.should();

describe("Sign up", () => {
  describe("Post/SignUp", () => {
    it("should signup success", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send({
          name: "KKKKKKk1",
          password: "password",
          title: "fullstack engineer",
          description: "i want a fullstack engineer",
          rate: 20,
          radio: "FREELANCER",
        })
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
        .post("/api/users")
        .send({ name: "james", password: "fake" })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });
});
