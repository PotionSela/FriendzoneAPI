// Importing Thought and User models
const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('user'); // Might need to take out .populate
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .populate('user'); // Might need to take out .populate
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!'});
            }
            
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true });

            return res.status(200).json({thought, user});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(400).json({ message: 'No thought with that Id!' });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(400).json({ message: 'No thought with that Id!'});
            }
            return res.status(200).json({ message: "Thought and associated reactions successfully deleted! "});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};