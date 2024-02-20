// Importing Thought and User models
const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);

            // If theres a server error, log it
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            
            if (!thought) {
                return res.status(400).json({ message: 'No thought with that ID!'});
            }
            
            return res.status(200).json(thought);

            // Server error, catch it and log it
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

            // For server error, catch it and log it
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

            // If there's a server error, catch and log it
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
            // Successful delete route message
            return res.status(200).json({ message: "Thought and associated reactions successfully deleted! "});

            // If there's a server error, catch and log it
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Adding a reaction
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true }
            );
            
            if (!reaction) {
                return res.status(400).json({ message: "No thought with that Id!" });
            }
            return res.status(200).json(reaction);

            // Server error, catch it and log it
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete reaction
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            
            if(!reaction) { 
                // If no reaction matches, send this error message
                return reaction.status(400).json
                ({ message: "Check thought and reaction Id please!"});
            }

            return res.status(200).json(reaction);

            // If there's a server error, catch and log it
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};