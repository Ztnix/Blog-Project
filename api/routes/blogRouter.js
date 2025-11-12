const { Router } = require("express");
const prismaController = require("../controllers/blogController");
const blogRouter = Router();
const passport = require("passport");
const path = require("path");
const { check, validationResult } = require("express-validator");
const { ensureMasterAdmin, ensureAuth } = require("../middlewares/auth.js");

blogRouter.post(
  "/signUp",
  [
    check("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 3 characters long"),
    check("password")
      .matches(/\d/)
      .withMessage("Password must contain at least one number"),
    // check("password")
    //   .matches(/[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/)
    //   .withMessage("Password must contain at least one special character"),
    check("username").isLength({ min: 4 }),
    check("passwordConfirm").custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), old: req.body });
    }
    next();
  },
  prismaController.signUp
);

blogRouter.get("/setUser", prismaController.setUser);

blogRouter.post("/login", passport.authenticate("local"), function (req, res) {
  res.json({ user: req.user });
});

blogRouter.post("/logout", prismaController.logOut);

//// Anything but account stuff

blogRouter.post("/newBlog", prismaController.newBlog);

blogRouter.get("/getBlogs", prismaController.getBlogs);

blogRouter.get("/blog/:title", prismaController.getSpecificBlog);

blogRouter.post("/newComment", prismaController.newComment);

blogRouter.get("/getComments/:title", prismaController.getComments);

// ADMIN STUFF

blogRouter.post(
  "/admin/changeUserRole",
  ensureAuth,
  ensureMasterAdmin,
  prismaController.changeUserRole
);

blogRouter.get(
  "/admin/getAllUsers",
  ensureAuth,
  ensureMasterAdmin,
  prismaController.getAllUsers
);

module.exports = blogRouter;
