const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "techmaster-phase4-classroom-secret-change-me";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30m";

function signToken(payload) {
  // payload should be the small, non-sensitive stuff: id, role, name.
  // NEVER put the password (or its hash) in here — the payload is
  // readable by anyone, it is only the signature that's protected.
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET); // throws if invalid/expired
}

module.exports = { signToken, verifyToken };
