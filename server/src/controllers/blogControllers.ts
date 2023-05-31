import asyncHandler from "express-async-handler";
import { Blog, IBlog } from "../models/blogModel";
import { Request, Response } from "express";

const postBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    console.log(req.body);
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
    const search = req.query.search;

    const page: number = parseInt(String(req.query.page)) || 1;
    const limit: number = parseInt(String(req.query.limit)) || 10;

    if (!search) {
      res.status(400);
      throw new Error("Nothing to search");
    }

    const options = {
      page,
      limit,
      sort: { createdAt: "desc" },
    };
    const query = { author: req.user._id };
    const result = await Blog.paginate(query, options);
    res.status(200).json({ message: "your blogs", data: result });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const viewBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
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

    const page: number = parseInt(String(req.query.page)) || 1;
    const limit: number = parseInt(String(req.query.limit)) || 10;

    if (!search) {
      res.status(400);
      throw new Error("Nothing to search");
    }
    const options = {
      page,
      limit,
      sort: { createdAt: "desc" },
    };

    const query = { $text: { $search: search } };

    const result = await Blog.paginate(query, options);
    res.status(200).json({
      message: "Search results",
      data: result,
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
    console.log(tags);
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
};
