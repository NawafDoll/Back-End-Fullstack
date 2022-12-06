import express from 'express';
import {
  addBlogHandler,
  deleteBlogHandler,
  getAllBlogsHandler,
  updateBlogHandler,
} from '../controller/blog.controller';
import { protect } from '../middelware/auth';
import validate from '../middelware/validate';
import {
  addBlogSchema,
  deleteBlogSchema,
  updateBlogSchema,
} from '../zodSchema/blog.zodSchema';

const router = express.Router();

router.get('/', protect, getAllBlogsHandler);
router.post('/', protect, validate(addBlogSchema), addBlogHandler);
router.put('/:blogid', protect, validate(updateBlogSchema), updateBlogHandler);
router.delete('/:blogid',  protect,  validate(deleteBlogSchema),  deleteBlogHandler);

export default router;