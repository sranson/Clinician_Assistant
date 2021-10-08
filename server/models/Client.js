const { Schema, model } = require('mongoose');


const clientSchema = new Schema({
    firstName: {
        type: String,
        required: 'Client must have a first name',
        minlength: 3,
        maxlength: 100,
        trim: true,
    },
    lastName: {
        type: String,
        required: 'Client must have a last name',
        minlength: 3,
        maxlength: 100
    },
    DOB: {
        type: Date,
        required: "Client must have a DOB"
    }
}) 


const Client = model('Client', clientSchema);

module.exports = Client;