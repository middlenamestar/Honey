const { User } = require('../models')

const userdata = [
    {
        ManmadeID:'90c1dce2-9a66-45fb-9cf7-ff349cbe69e4',
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
        ManmadeID:'383dbedc-9bf1-4191-9d9f-6638f5b9c3d2',
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
        ManmadeID:'7b732d12-7e6c-4836-8f67-2c88fb1d8050',
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
        ManmadeID:'9c3a9b21-6059-466d-b9ad-6ff0440886fa',
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