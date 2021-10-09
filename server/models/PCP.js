const { Schema, model } = require('mongoose');


const pcpSchema = new Schema({
    pcpFirstName: {
        type: String
    },
    pcpLastName: {
        type: String
    },
    pcpNPI: {
        type: String
    },
    pcpPhoneNumber: {
        type: String
    },
    pcpFaxNumber: {
        type: String
    },
})


const PCP = model('PCP', pcpSchema);
module.exports = PCP;