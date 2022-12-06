import {Blog} from '@prisma/client'
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { IUser } from '../middelware/auth';
import {
  deleteBlogSchemaType,
  updateBlogSchemaType,
} from '../zodSchema/blog.zodSchema';

export const getAllBlogsHandler = async (req: Request, res: Response) => {
  try {
    const getAllBlogs = await prisma.blog.findMany();
    return res.status(200).json(getAllBlogs);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "server Error !",
    });
  }
};

export const addBlogHandler = async (req: Request, res: Response) => {
  const newBlog = req.body as Blog;
  try {
    await prisma.blog.create({
      data: newBlog,
    });

    return res.status(201).json({
      message: "Blog added ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
};

export const updateBlogHandler = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as IUser;
    const updatedBlog = req.body as Blog;
    const { blogid } = req.params as updateBlogSchemaType;

    const isUpdated = await prisma.blog.updateMany({
      where: {
        id: blogid,
        user_id: user.id,
      },
      data: updatedBlog,
    });

    if (isUpdated.count == 0) {
      return res.status(400).json({
        message: 'Invalid Blog id',
      });
    }

    return res.status(200).json({
      message: 'Blog updated !',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error !',
    });
  }
};

export const deleteBlogHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;
  const { blogid } = req.params as deleteBlogSchemaType;

  const deleteCount = await prisma.blog.deleteMany({
    where: {
      id: blogid,
      user_id: user.id,
    },
  });

  if (deleteCount.count == 0) {
    return res.status(400).json({
      message: 'Invalid blog id',
    });
  }

  return res.status(200).json({
    message: 'blog deleted !',
  });
};