// Importing User, and Thoughts models
const { User, Thought } = require('../models');

module.exports = {
    // Get all users by id
    async getUser(req, res) {
        try {
            // Get Id, and populate thought and friend data
            const user = await User.find().populate('thought').populate('friends');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thought');

            if (!user) {
                return res.status(400).json({ message: 'No user with that ID!'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update user by user Id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Delete route to remove user by its _Id
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            // Remove a user's associated thoughts when deleted
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Post to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId, 
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.friendId } }, 
                { new: true } );

                if (!user) {
                    return res.status(400).json({ message: 'No friend found with that Id!'});
                }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Remove friend from a user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { friendId: req.params.friendId} }},
                { new: true }
            );
            
            if (!user) {
                return res.status(400).json( { message: 'No friend with that Id! '});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};