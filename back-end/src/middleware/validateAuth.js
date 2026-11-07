const ApiError = require("../utils/ApiError");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("'name' is required.");
  }
  if (!email || !EMAIL_RE.test(email)) {
    errors.push("A valid 'email' is required.");
  }
  if (!password || String(password).length < 6) {
    errors.push("'password' is required and must be at least 6 characters.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join(" ")));
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push("'email' is required.");
  if (!password) errors.push("'password' is required.");

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join(" ")));
  }
  next();
}

module.exports = { validateRegister, validateLogin };
