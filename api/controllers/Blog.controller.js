import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";
import { getCategoryById, getCategoryBySlug } from "../helpers/categories.js";
import geminiService from "../services/gemini.service.js";

// Helper function to add category info to blogs
const addCategoryInfo = (blogs) => {
  if (Array.isArray(blogs)) {
    return blogs.map((blog) => ({
      ...blog,
      category: getCategoryById(blog.category),
    }));
  } else {
    return {
      ...blogs,
      category: getCategoryById(blogs.category),
    };
  }
};
export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "yt-mern-blog",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      author: data.author,
      category: data.category, // category in id form from frontend so required to get category name when ever we fetch blogs
      title: data.title,
      slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent),
    });

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog added successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const editBlog = async (req, res, next) => { // get Blog details for edit using _id
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).lean();
    if (!blog) {
      next(handleError(404, "Data not found."));
    }

    // Get category info from hardcoded categories
    const categoryInfo = getCategoryById(blog.category);
    blog.category = categoryInfo;

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid);

    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);

    let featuredImage = blog.featuredImage;

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "yt-mern-blog",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    blog.featuredImage = featuredImage;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "Blog Deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const showAllBlog = async (req, res, next) => {
  try {
    const user = req.user;
    let blog;
    if (user.role === "admin") {
      blog = await Blog.find()
        .populate("author", "name avatar role")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    } else {
      blog = await Blog.find({ author: user._id })
        .populate("author", "name avatar role")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }

    // Add category info to blogs
    blog = addCategoryInfo(blog);

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar role") 
      .lean()
      .exec();

    if (blog) {
      // Add category info
      const blogWithCategory = addCategoryInfo(blog);
      res.status(200).json({
        blog: blogWithCategory,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category, blog } = req.params;

    const categoryData = getCategoryBySlug(category);
    if (!categoryData) {
      return next(handleError(404, "Category data not found."));
    }
    const categoryId = categoryData._id;
    const relatedBlog = await Blog.find({
      category: categoryId,
      slug: { $ne: blog },
    })
      .lean()
      .exec();

    // Add category info to related blogs
    const relatedBlogWithCategory = addCategoryInfo(relatedBlog);

    res.status(200).json({
      relatedBlog: relatedBlogWithCategory,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = getCategoryBySlug(category);
    if (!categoryData) {
      return next(handleError(404, "Category data not found."));
    }
    const categoryId = categoryData._id;
    const blog = await Blog.find({ category: categoryId })
      .populate("author", "name avatar role")
      .lean()
      .exec();

    // Add category info to blogs
    const blogWithCategory = addCategoryInfo(blog);

    res.status(200).json({
      blog: blogWithCategory,
      categoryData,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const blog = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name avatar role")
      .lean()
      .exec();

    // Add category info to search results
    const blogWithCategory = addCategoryInfo(blog);

    res.status(200).json({
      blog: blogWithCategory,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Add category info to blogs
    const blogWithCategory = addCategoryInfo(blog);

    res.status(200).json({
      blog: blogWithCategory,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const generateBlogContent = async (req, res, next) => {
    try {
        const { title, category } = req.body

        if (!title || !category) {
            return next(handleError(400, 'Title and category are required'))
        }

        // Get category name from ID
        const categoryInfo = getCategoryById(category)
        const categoryName = categoryInfo.name

        const result = await geminiService.generateBlogContent(title, categoryName)

        if (!result.success) {
            return next(handleError(500, result.error))
        }

        res.status(200).json({
            success: true,
            content: result.content,
            message: 'Blog content generated successfully'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}