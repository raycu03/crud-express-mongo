const mongoose = require('mongoose');

var carsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    model: {
        type: String
    }
    }, 
        {
            versionKey: false
        }
);

mongoose.model('Cars', carsSchema);