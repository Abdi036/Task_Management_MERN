const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// function to generate a token
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.EXPIRES_IN,
  });
}

// signup user

catchAsync(async function signUp(req, res, next) {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("user already exists", 400));
  }

  //   hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ username, email, password: hashedPassword });
  const token = generateToken(user._id);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    },
  });
});
