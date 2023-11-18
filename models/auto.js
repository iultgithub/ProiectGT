const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    descriere: {
        type: String,
        required: true,
        unique: true,
    },
});

const autoSchema = new mongoose.Schema({
    nrauto: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    },
    descriere: String,
    consum: {
        type: Number,
        required: true,
    },
});

const Type = mongoose.model('Type', typeSchema);
const Auto = mongoose.model('Auto', autoSchema);

module.exports = {
    Type: Type,
    Auto: Auto,
};
