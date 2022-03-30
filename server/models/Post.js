const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

// comments for posts schema
const commentSchema = new Schema(
    {
       commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
       },
       commentBody: {
           type: String,
           required: true,
           maxlength: 300
       },
       username: {
           type: String,
           required: true
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: (createdAtTime) => moment(createdAtTime).format('MM DD, YYYY [at] HH:mm')
       }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

// posts schema
const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => moment(createdAtTime).format('MM DD, YYYY [at] HH:mm')
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual that retrieves the length of the post's reaction array field on query
postSchema.virtual('commentCount').get(function() {
    return this.comments.length
})

// Initialize Post model
const Post = model('Post', postSchema);

module.exports = Post