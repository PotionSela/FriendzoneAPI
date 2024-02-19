// Requiring Mongoose
const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    },
    {
        // Configuring Mongoose to include virtual properties
        toJSON: {
            virtuals: true
        },
        // Telling Mongoose to not include the 'id' field in the JSON rep
        id: false
    });

    // Implement friendCount in the User model by using the virtual() method on the userSchema
    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });

    const User = model('User', userSchema);

    module.exports = User;