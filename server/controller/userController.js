const { User, Post } = require('../models');

// Not sure how to incorporate messages - added to getSingleUser but not sure if everyone can see it??
// how is matches getting added? 
let thisisaSwitch
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
  getUserInfo(req, res) {
    User.findOne({ ManmadeID: req.query.userId })
      .select("-__v")
      .populate("matches")
      .populate("posts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(201).send(user)
      )
      .catch((err) => res.status(500).json(err));
  },





  logInUser(req, res) {
   return User.findOne({ email: req.body.email})
        .select("-__v")
        .populate("matches")
        .populate("posts")
        .then((user) =>{
          if(!user){
            res.status(404).json({ message: "No user with that ID" })
          }else{return user}
        })
        
  },






  checkExist(email) {
  return  User.findOne({ email: email })
      .select("-__v")
      .populate("matches")
      .populate("posts")
      .then((user) =>{
        if(user){thisisaSwitch= true}
          else{thisisaSwitch= false}
        return thisisaSwitch
        });

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

  signUpUser(data) {
    return User.create(data)
      .then((user) => user)
      .catch((err) => {
        console.log(err);
      });
  },
  // update a user - not sure if this is something we would need?
  onBoarding(req, res, formData) {
    //   console.log(req.params)
    //   console.log(req.body)
  return  User.findOneAndUpdate(
      {ManmadeID:formData.user_id },
      { $set: {
        username: formData.username,
        dobDay: formData.bdayDay,
        dobMonth: formData.bdayMo,
        dobYear:formData.bdayYear,
        bio: formData.bio,
        myAnimeListUsername: formData.malUsername
      } },
      { runValidators: true, new: true }
    )
      .then((user) =>{
        if(!user){
          res.status(404).json({ message: "No user with that ID" })
        }else{res.send(user)}
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
  ImageUpload(req, res, imageURL, userId) {
    //   console.log(req.params)
    //   console.log(req.body)
  return  User.findOneAndUpdate(
      {ManmadeID:userId },
      { $set: {
        imageURL:imageURL
      } },
      { runValidators: true, new: true }
    )
      .then((user) =>{
        if(!user){
          res.status(404).json({ message: "No user with that ID" })
        }
      })
      .catch((err) => res.status(500).json(err));
  },

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
