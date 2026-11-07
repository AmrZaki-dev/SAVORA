const { verifyToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "No token provided. Send it as: Authorization: Bearer <token>"));
  }

  try {
    const decoded = verifyToken(token); // { id, name, email, role, iat, exp }
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ApiError(401, "Your session has expired. Please log in again."));
    }
    return next(new ApiError(401, "Invalid token."));
  }
}

module.exports = authenticate;
