const usersStore = require("../data/usersStore");
const ApiError = require("../utils/ApiError");
const { signToken } = require("../utils/jwt");

// POST /api/auth/register
// Always creates a "user" role account — role is never trusted from
// the client, no matter what the request body contains.
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (usersStore.emailExists(email)) {
      return next(new ApiError(409, "An account with this email already exists."));
    }

    const user = await usersStore.create({ name, email, password, role: "user" });
    const token = signToken({ id: user.id, name: user.name, email: user.email, role: user.role });

    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const userRecord = usersStore.getByEmailWithPassword(email);
    if (!userRecord) {
      return next(new ApiError(401, "Invalid email or password."));
    }

    const passwordMatches = await usersStore.verifyPassword(password, userRecord.password);
    if (!passwordMatches) {
      return next(new ApiError(401, "Invalid email or password."));
    }

    const user = usersStore.toPublicUser(userRecord);
    const token = signToken({ id: user.id, name: user.name, email: user.email, role: user.role });

    res.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me  (protected)
function me(req, res, next) {
  const user = usersStore.getById(req.user.id);
  if (!user) {
    return next(new ApiError(404, "This account no longer exists."));
  }
  res.status(200).json({ success: true, data: user });
}

module.exports = { register, login, me };
