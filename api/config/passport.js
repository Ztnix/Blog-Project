const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM public."User" WHERE username = $1',
          [username]
        );
        const user = rows[0];
        if (!user) return done(null, false, { message: "Incorrect username" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM public."User" WHERE id = $1',
        [id]
      );
      done(null, rows[0] || false);
    } catch (err) {
      done(err);
    }
  });
};
