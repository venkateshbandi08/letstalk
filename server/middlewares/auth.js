const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send({ msg: "Token is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.send({ msg: "token not matched" });
    }
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(401).send({ msg: "Invalid Token" });
  }
};
