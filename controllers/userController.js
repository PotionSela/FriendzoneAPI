// Importing User, and Thoughts models
const { User, Thought } = require('../models');

module.exports = {
    // Get all users by id
    async getUsers(req, res) {
        try {
            // Get Id
            const users = await User.find();
            res.json(users);

            // If there's a server error, catch it and log it 
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                // If there's no user, return with 400 error message
                return res.status(400).json({ message: 'No user with that ID!'});
            }
            res.json(user);

            // If there's a server error, catch it and log it
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            // Successful status
            res.status(200).json(user);

            // Else catch the error and log it
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update user by user Id
    async updateUser(req, res) {
        try {
            // Try to find the user by userId
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            res.json(user);

            // If there's an error, catch it and log it
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Delete route to remove user by its _Id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            
            if (!user) {
                return res.status(400).json({ message: "No user with that Id!" });
            }

            // Remove a user's associated thoughts when deleted
            await Thought.deleteMany({ _id: { $in: user.thoughts} });
            return res.status(200).json({ message: "User and associated thoughts deleted!" });

            // Else catch the error and log it
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Post to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { $addToSet: { friends: req.params.friendId } }, 
                { runValidators: true, new: true } );

                if (!friend) {
                    return res.status(400).json({ message: 'No friend found with that Id!'});
                }
                // Return a successful message
            return res.status(200).json(friend, { message: "You added a new friend! Exciting! "});

            // Else catch the error and log it
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Remove friend from a user
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId} },
                { runValidators: true, new: true }
            );
            
            if (!friend) {
                return res.status(400).json( { message: 'No friend with that Id! Please check the Id!'});
            }
            // Return a successful message
            return res.status(200).json(friend, { message: "You removed a friend successfully!"});

            // Else catch the error and log it
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};