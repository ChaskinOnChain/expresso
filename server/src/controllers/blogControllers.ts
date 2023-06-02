import asyncHandler from "express-async-handler";
import { Blog, IBlog } from "../models/blogModel";
import User from "../models/userModel";
import { Request, Response } from "express";

const postBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
      res.status(400);
      throw new Error("Missing content, title, or tags");
    }
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    if (!req.file) {
      res.status(400);
      throw new Error("No image file uploaded");
    }
    const tagsArray = tags.split(",");
    const imgBuffer = req.file.buffer;
    const blog = new Blog({
      title,
      author: req.user._id,
      content,
      tags: tagsArray,
      img: imgBuffer,
    });
    const user = await User.findById(req.user._id);
    user.blogs = [...user.blogs, blog];
    await user.save();
    const savedBlog = await blog.save();
    res.status(200).json({ message: "blog posted", data: savedBlog });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const viewYourOwnBlogs = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const blogs = await Blog.find({ author: req.user._id }).sort({
      createdAt: "desc",
    });

    res.status(200).json({ message: "your blogs", data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const viewAllBlogs = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const blogs = await Blog.find()
      .sort({ date: -1 })
      .populate({ path: "author", select: "username" });

    res.status(200).json({ message: "all blogs", data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const viewBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await Blog.findById(id)
    .populate("author", "username email img ethereum_address")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username img",
      },
    });

  if (!blog) {
    res.status(400);
    throw new Error("No blogs with that id");
  }
  res.status(200).json({ message: "your blog", data: blog });
});

const comment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(400);
      throw new Error("No blogs with that id");
    }
    const { comment } = req.body;
    if (!comment) {
      res.status(400);
      throw new Error("No comment");
    }
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    blog.comments = [...blog.comments, { user: req.user._id, comment }];
    await blog.save();
    res.status(200).json({ message: "comment successful", data: blog });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const viewComments = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(400);
      throw new Error("No blogs with that id");
    }
    if (req.user._id.toString() !== blog.author.toString()) {
      res.status(400);
      throw new Error("Not your blog");
    }
    res.status(200).json({ message: "your comments", comments: blog.comments });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const searchBlogs = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;

    if (!search) {
      res.status(400);
      throw new Error("Nothing to search");
    }

    const blogs = await Blog.find({ $text: { $search: search } }).sort({
      createdAt: "desc",
    });

    res.status(200).json({
      message: "Search results",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const deletePostOrComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(400);
      throw new Error("No blogs with that id");
    }
    const deleted = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "delete successfull", data: deleted });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const filterByTag = async (req: Request, res: Response) => {
  try {
    const tags = req.query.tags;
    if (!tags) {
      res.status(400);
      throw new Error("Nothing to search");
    }
    const blogs = await Blog.find();
    let match: IBlog[] = [];
    blogs.forEach((blog) => {
      if (Array.isArray(tags)) {
        tags.forEach((tag) => {
          if (typeof tag === "string" && blog.tags.includes(tag)) {
            match.push(blog);
          }
        });
      } else if (typeof tags === "string") {
        if (blog.tags.includes(tags)) {
          match.push(blog);
        }
      }
    });
    res.status(200).json({ message: "tag results", data: match });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

export {
  postBlog,
  viewYourOwnBlogs,
  viewBlog,
  comment,
  viewComments,
  searchBlogs,
  deletePostOrComment,
  filterByTag,
  viewAllBlogs,
};
