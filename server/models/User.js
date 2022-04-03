const {Schema, model} = require('mongoose')


// user schema
const userSchema = new Schema(
    {
        ManmadeID: {
            type: String,
            required: true,
            trim: true //removing white space
        },
        username: {
            type: String,
            unique: true,
            sparse:true,
            trim: true //removing white space
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/ //matching if it is an email
        },
        password: {
            type: String,
            required: true,
        },
        dobDay: {
            type: Number,

        },
        dobMonth: {
            type: String,

        },
        dobYear: {
            type: Number,

        },
        bio: {
            type: String,
            trim: true
        },
        interest: {
            type: String,
            trim: true
        },
        myAnimeListUsername: {
            type: String,
            trim: true
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        // messages: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Message'
        //     }
        // ],
        matches: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Virtual that retrieves the length of the user's matches array field on query
userSchema.virtual('matchCount').get(function() {
    return this.matches.length
})


// Initialize User model
const User = model('User', userSchema)

module.exports = User