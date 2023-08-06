const mongoose = require('mongoose')
const bloods = require('../data/bloods')


const bloodsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/free-vector/empty-conference-room_529539-71.jpg?w=2000',
    },

    user: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});
bloodsSchema.set('toJSON', {
    transform: (document, returnDocument) => {
        returnDocument.id = document._id.toString(),
            delete returnDocument._id;
        delete returnDocument.__v

    }
});

module.exports = mongoose.model('Bloods', bloodsSchema)