var { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeaders = (req: {
  headers: { authorization: string };
}): string | null => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET || "password",
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET || "password",
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
};

export default auth;
