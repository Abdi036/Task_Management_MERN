const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Protect middleware

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// function to generate a token
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.EXPIRES_IN,
  });
}

// signup user

exports.signUp = catchAsync(async (req, res, next) => {
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
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    },
  });
});

// Login User
exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const token = generateToken(user._id);

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status: "success",
      data: {
        user: {
          username: user.username,
          email: user.email,
        },
        token,
      },
    });
  } else {
    return next(new AppError("Invalid email or password", 401));
  }
});
