import { Router } from 'express';
import * as PostController from '@/api/controllers/post.controller';

const router = new Router();
router.route('/posts')
      .get(PostController.getPosts)
      .post(PostController.addPost);

router.route('/posts/:id')
      .get(PostController.getPost)
      .delete(PostController.deletePost);

export default router;
