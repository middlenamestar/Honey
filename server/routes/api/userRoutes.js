const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    // updateUser,
    deleteUser,
    likedUserUpdate
} = require('../../controller/userController');

// /api/users/
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    // .put(updateUser)
    .delete(deleteUser)
    .put(likedUserUpdate);

module.exports = router;