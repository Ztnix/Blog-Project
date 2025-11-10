require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prismaRouter = require("../routes/blogRouter");

async function signUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
      select: { id: true, username: true },
    });
    return res.status(201).json({ success: true, user, redirect: "/home" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function logOut(req, res, next) {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Session destroy failed" });
      res.clearCookie("connect.sid");
      return res.json({ ok: true });
    });
  });
}

//// Anything but account stuff

async function newBlog(req, res, next) {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id,
      },
    });
    return res.status(201).json({ success: true, redirect: "/home" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getBlogs(req, res, next) {
  try {
    const posts = await prisma.post.findMany();
    const formattedPosts = posts.map((p) => ({
      ...p,
      created_at: new Date(p.created_at).toLocaleDateString("en-GB"),
    }));
    res.json({ posts: formattedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function getSpecificBlog(req, res, next) {
  const blogTitle = req.params.title;
  try {
    const prePost = await prisma.post.findUnique({
      where: { title: blogTitle },
    });
    const post = {
      ...prePost,
      created_at: new Date(prePost.created_at).toLocaleDateString("en-GB"),
    };
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function newComment(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: { title: req.body.postTitle },
    });
    const comment = await prisma.comment.create({
      data: {
        content: req.body.comment,
        postId: post.id,
        userId: req.user.id,
      },
    });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getComments(req, res, next) {
  const blogTitle = req.params.title;
  try {
    const post = await prisma.post.findUnique({
      where: { title: blogTitle },
    });

    const comments = await prisma.comment.findMany({
      where: { postId: post.id },
      include: {
        User: { select: { username: true } },
      },
      orderBy: { created_at: "desc" },
    });
    const formattedComments = comments.map((c) => ({
      ...c,
      created_at: new Date(c.created_at).toLocaleDateString("en-GB"),
    }));
    res.json({ comments: formattedComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

async function uploadFileForm(req, res) {
  const folderId = req.params.folderId;
  res.render("uploadFileForm", {
    user: req.user,
    title: "Upload your file",
    folderId: folderId,
  });
}

async function uploadFile(req, res) {
  const folderId = parseInt(req.params.folderId);

  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    await prisma.file.create({
      data: {
        name: file.originalname,
        path: file.path,
        size: file.size,
        folderId: folderId,
      },
    });

    return res.redirect("/folders");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create file record" });
  }
}

module.exports = {
  logOut,
  signUp,
  newBlog,
  getBlogs,
  getSpecificBlog,
  getComments,
  newComment,
  uploadFileForm,
  uploadFile,
};
