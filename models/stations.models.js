const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    coach:{
        type: String,
        required: true,
        enum: ['First Class', 'Business', 'Economy']
    },
    image: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    _id: true
});

const Train = mongoose.model("Train", TrainSchema);

module.exports = Train;