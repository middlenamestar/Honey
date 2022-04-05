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
    return User.findOne({ email: req.body.email })
      .select("-__v")
      .populate("matches")
      .populate("posts")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          return user;
        }
      });
  },

  checkExist(email) {
    return User.findOne({ email: email })
      .select("-__v")
      .populate("matches")
      .populate("posts")
      .then((user) => {
        if (user) {
          thisisaSwitch = true;
        } else {
          thisisaSwitch = false;
        }
        return thisisaSwitch;
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
  async onBoarding(req, res, formData) {
    //   console.log(req.params)
    //   console.log(req.body)
    const ApiResponse = await axios.get(
      `https://api.myanimelist.net/v2/users/${formData.malUsername}/animelist?limit=100`,
      {
        headers: {
          "X-MAL-CLIENT-ID": "0969c704ebfcb780acbeb8f07e66e05d",
        },
      }
    );
    let TitleData = [];
    let catTitleData = [];
    ApiResponse.data.data.map((item) => {
      TitleData.push(item.node.title);
    });
    //console.log(TitleData)
    var i = TitleData.length,
      k,
      temp;
    while (--i > 0) {
      k = Math.floor(Math.random() * (i + 1));
      temp = TitleData[k];
      TitleData[k] = TitleData[i];
      TitleData[i] = temp;
    }
    for (var j = 0; TitleData.length < 5 ? j < TitleData.length : j < 5; j++) {
      catTitleData.push(TitleData[j]);
    }
    return User.findOneAndUpdate(
      { ManmadeID: formData.user_id },
      {
        $set: {
          username: formData.username,
          dobDay: formData.bdayDay,
          dobMonth: formData.bdayMo,
          dobYear: formData.bdayYear,
          bio: formData.bio,
          myAnimeListUsername: formData.malUsername,
          animeTitles: catTitleData,
        },
      },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          res.send(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  ImageUpload(req, res, imageURL, userId) {
    //   console.log(req.params)
    //   console.log(req.body)
    return User.findOneAndUpdate(
      { ManmadeID: userId },
      {
        $set: {
          imageURL: imageURL,
        },
      },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  likedUserUpdate(req, res) {
    console.log(req.params);
    console.log(req.body);
    console.log("thisisReq", req);
    return User.findOneAndUpdate(
      { ManmadeID: req.params.userId },
      { $push: { matches: req.body.likedUserID } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        console.log("loggin Here");
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          res.send(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
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
  },
};
