var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var DoctorSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
cin: {
        type: String,
        required: true
    },
doctorNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
telNum: {
        type: String,
        required: true
    },
specialty: {
        type: String,
        required: true
    },
components: {
        type: String,
        required: true
    },
picture: {
        type: String,
        required: true
    },
typeC: {
	type: String,
        required: true
    },

    created_at: Date
});
 
DoctorSchema.pre('save', function (next) {
    var doctor = this;
    // get the current date
    var currentDate = new Date();
 
    // if created_at doesn't exist, add to that field
    if (!doctor.created_at) {
        doctor.created_at = currentDate;
    }
    next();
});
 
module.exports = mongoose.model('Doctor', DoctorSchema);
