const { User } = require('../models')

const userdata = [
    {
        firstName: 'Jack',
        lastName: 'Vent',
        username: 'animelove1',
        email: 'jack@email.com',
        password: '1234Password',
        dobDay: 12,
        dobMonth: 'May',
        dobYear: 1990,
        bio: 'This is a bio',
        interest: 'Anime',
        myAnimeListUsername: 'animelove1',
        posts: [],
        matches: []
    },
    {
        firstName: 'Bennett',
        lastName: 'Garcia',
        username: 'benben',
        email: 'bennett@email.com',
        password: '5678Password',
        dobDay: 30,
        dobMonth: 'May',
        dobYear: 1999,
        bio: 'This is a bio',
        interest: 'Anime',
        myAnimeListUsername: 'benben',
        posts: [],
        matches: []
    },
    {
        firstName: 'Minnie',
        lastName: 'Simon',
        username: 'mickanime',
        email: 'minnie@email.com',
        password: '2288Password',
        dobDay: 1,
        dobMonth: 'December',
        dobYear: 1982,
        bio: 'This is a bio',
        interest: 'Anime',
        myAnimeListUsername: 'mickanime',
        posts: [],
        matches: []
    },
    {
        firstName: 'Jan',
        lastName: 'Jackson',
        username: 'jananime',
        email: 'jan@email.com',
        password: '7891Password',
        dobDay: 15,
        dobMonth: 'August',
        dobYear: 1987,
        bio: 'This is a bio',
        interest: 'Anime',
        myAnimeListUsername: 'jananime',
        posts: [],
        matches: []
    }
]

const seedUsers = () => userdata;

module.exports = seedUsers;