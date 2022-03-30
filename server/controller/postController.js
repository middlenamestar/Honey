const { User, Post } = require("../models");

module.exports = {
  // get all posts
  getPosts(req, res) {
    Post.find({})
      .sort({ createdAt: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => res.status(400).json(err));
  },
  // get one post
  getSinglePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with that ID" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a post
  createPost({body}, res) {
    Post.create(body)
      .then(({ username, _id }) => {
        return User.findOneAndUpdate(
          { username: username },
          { $push: { posts: _id } }, // use $push instead?
          { runValidators: true, new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message: "Post created, but no user found with that ID",
              })
          : res.json("Created the post!")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update a post
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with this ID" })
          : res.json(post)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a post
  deletePost(req, res) {
    Post.findOneAndRemove({ _id: req.params.postId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with this ID" })
          : User.findOneAndUpdate(
              { posts: req.params.postId },
              { $pull: { posts: req.params.postId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Post deleted but no user with this id!" })
          : res.json({ message: "Post deleted successfully" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // add comment to a post
  addComment(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { comments: req.body } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with this ID" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove a comment
  removeComment(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { comments: { commentId: req.params.commentId } } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post with this ID" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  }
};
