const connection = require('../config/connection');
const seedPosts = require('./postData');
const seedUsers = require('./userData');
const { Post, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    const users = seedUsers();

    await User.collection.insertMany(users)
    
    await Post.deleteMany({});

    const posts = seedPosts();

    await Post.collection.insertMany(posts)

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.table(posts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})