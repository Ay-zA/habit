import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import Post from '@/models/post';

export function getPosts(req, res, next) {
  Post
    .find()
    .sort('-dateAdded')
    .then(posts => res.json({ posts }))
    .catch(err => {
      res.status(500);
      return next(err);
    });
}

export function addPost(req, res, next) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(400);
    return next(new Error('AddPostController: Bad Data'));
  }

  const newPost = new Post(req.body.post);

  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });

  newPost
    .save()
    .then(saved => res.json({ post: saved }))
    .catch(err => {
      res.status(500);
      return next(err);
    });
}

export function getPost(req, res, next) {
  Post
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json({ post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500);
      next(err);
    });
}

export function deletePost(req, res, next) {
  Post
    .findOneAndRemove({ _id: req.params.id })
    .then((post) => {
      if (post) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500);
      next(err);
    });
}
