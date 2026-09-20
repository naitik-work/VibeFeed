const jwt= require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access!",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || "vibefeed_default_secret_key_2026");
  } catch (err) {
    return res.status(401).json({
      message: "User not authorized.",
    });
  }
  req.user= decoded; //user property in request.

  next()
}

module.exports= identifyUser;