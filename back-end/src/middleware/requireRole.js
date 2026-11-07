const ApiError = require("../utils/ApiError");

// Usage: router.delete("/:id", authenticate, requireRole("admin"), handler)
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required."));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "You don't have permission to do that."));
    }
    next();
  };
}

module.exports = requireRole;
