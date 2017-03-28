var express = require('express');
 
var app = module.exports = express.Router();
 
var Doctor = require('./doctor'); 
 
// POST
// Create a new Doctor
app.post('/doctors', function (req, res) {  
  if (!req.body.userName) {
    return res.status(400).send({ "success": false, "msg": "You need to fill all blanks!" });
  }
 
  var newDoctor = new Doctor({ 
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    cin: req.body.cin,
    doctorNumber: req.body.doctorNumber,
    password: req.body.password,
    telNum: req.body.telNum,
    specialty: req.body.specialty,
    components: req.body.components,
    picture: req.body.picture,
    typeC: req.body.typeC

  });
 
  newDoctor.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating doctor", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Doctor Account.' });
  });
});
 


// GET
app.get('/doctors', function (req, res) {
  Doctor.find({}, function (err, doctors) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while Connecting on this doctor", "error": err });
    }
 
    res.status(200).send({ "success": true, "result": doctors });
  });
});

