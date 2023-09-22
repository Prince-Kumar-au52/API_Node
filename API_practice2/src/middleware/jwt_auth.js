const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    const token = authHeader.split(" ")[1]; // Changed variable name to 'token'
    console.log(token);
    const verify = jwt.verify(token, process.env.secretKey);
    console.log(verify);
    if (verify.success.name == "Alka sinha") {
      next();
    } else {
      return res.status(401).json({
        msg: "not admin",
      });
    }
  } catch (err) {
    return res.status(401).json({
      msg: "invalid token",
    });
  }
};
