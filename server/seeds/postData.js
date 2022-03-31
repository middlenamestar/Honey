const { Post } = require('../models')

const postdata = [
    {
        post: 'This is a random post 1.',
        username: 'animelove1'
    },
    {
        post: 'This is a random post 2.',
        username: 'benben'
    },
    {
        post: 'This is a random post 3.',
        username: 'mickanime'
    },
    {
        post: 'This is a random post 4.',
        username: 'jananime'
    }
]

const seedPosts = () => postdata;

module.exports = seedPosts;