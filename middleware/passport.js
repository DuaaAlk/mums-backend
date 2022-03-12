const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

const User = require("../Database/models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (passwordMatch) return done(null, user);
    const err = {
      message: "Unauthorized",
      status: 401,
    };
    return done(err);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (jwtPayload, done) => {
    // check if the token expires or not
    console.log(jwtPayload);
    if (Date.now() > jwtPayload.exp) {
      console.log("Token is expired");
      done(null, false);
    }
    //for security reson cheack the if the user exists
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        console.log("User is found");
        done(null, user);
      } else done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
