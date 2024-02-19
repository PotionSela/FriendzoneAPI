// Importing User, and Thoughts models
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUser(req, res) {
        try {
            const user = await User.find().populate('thought');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}