// Requiring Mongoose
const { Schema } = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ reactionSchema ]
    },
    {
        // Configuring Mongoose to include virtual properties
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // Telling Mongoose to not include the 'id' field in the JSON representation
        id: false
    });

    // Implementing reactionCount in the Thought model by using the virtual() method
    thoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

    const Thought = mongoose.model('Thought', thoughtSchema);

    module.exports = Thought;