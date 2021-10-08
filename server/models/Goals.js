const { Schema, model } = require('mongoose');


const goalSchema = new Schema({
    goalText: {
        type: String,
        minlength: 5,
        maxlength: 400,
        trim: true
    },
})


const Goal = model('Goal', goalSchema);

module.exports = Goal;



// Salome will demonstrate improved expressive language 
// evidenced by her ability to identify and label common objects with
// 85% accuracy across 3 consecutive sessions.

