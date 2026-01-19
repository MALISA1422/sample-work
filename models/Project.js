const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    highlights: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', projectSchema);
