const { User, Post } = require('../models');

// Not sure how to incorporate messages - added to getSingleUser but not sure if everyone can see it??
// how is matches getting added? 

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("matches")
      .populate("posts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // update a user - not sure if this is something we would need?
//   updateUser(req, res) {
//     //   console.log(req.params)
//     //   console.log(req.body)
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: "No user with that ID" })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },

  // delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.posts } })
      )
      .then(() => res.json({ message: "User and posts deleted!" }))
      .catch((err) => res.status(500).json(err));
  }
};
