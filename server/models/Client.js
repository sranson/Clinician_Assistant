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
        type: String,
        required: "Client must have a DOB"
    },
    insuranceId: {
        type: Number
    },
    payorSource: {
        type: String
    },
    PCP: {
        type: Schema.Types.ObjectId,
        ref: 'PCP'
    },
    serviceStartTime: {
        type: String
    },
    serviceEndTime: {
        type: String
    },
    POC_start_date: {
        type: String
    },
    POC_end_date: {
        type: String
    },
    authStart: {
        type: String
    },
    authEnd: {
        type: String,
    },
    units: {
        type: Number
    },
    evalDate: {
        type: String
    },
    goals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Goal'
        },
    ]
}) 


const Client = model('Client', clientSchema);

module.exports = Client;