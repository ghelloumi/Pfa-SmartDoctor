var morgan = require('morgan'),
    cors = require('cors'),
    http = require('http'),
    express = require('express'),
    errorhandler = require('errorhandler'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    helmet = require('helmet'),
    config = require('./config.json'),
    app = express(),
    socket = require('socket.io'),
    multer = require('multer'),
    methodOverride = require('method-override');

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('../client'));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(errorhandler())
}
var port = process.env.PORT || 3001;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.use(require('./doctor-routes'));
var server = http.createServer(app),
    socket = socket.listen(server);





//-----------
//addpatient
//-----------
var Patient = mongoose.model('Patient', {
    nom: String,
    prenom: String,
    age: Number,
    maladie: String
});
app.get('/api/addpatient', function (req, res) {

    console.log("fetching patient");

    // use mongoose to get all reviews in the database
    Patient.find(function (err, addpatient) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(addpatient); // return all reviews in JSON format
    });
});
// create review and send back all reviews after creation
app.post('/api/addpatient', function (req, res) {

    console.log("creating patient");

    // create a review, information comes from request from Ionic
    Patient.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        maladie: req.body.maladie,
        done: false
    }, function (err, patient) {
        if (err)
            res.send(err);

        // get and return all the reviews after you create another
        Patient.find(function (err, addpatient) {
            if (err)
                res.send(err)
            res.json(addpatient);
        });
    });

});
//-------------------


//-----------
//Doctor Pic
//-----------
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './doctorsPics/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');
app.post('/doctors/doctorsPics', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        console.log(req.file.filename);
        if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        res.json({error_code: 0, err_desc: null});
    });
});
//-------------------------


//-----------------
//For chat service
//-----------------
var Msg = mongoose.model('Msg', {
    source: String,
    content: String,
    date: String,
    doctorId: String
});
socket.on('connection', function (connection) {
    console.log('User Connected');
    connection.on('item', function (item) {
        socket.emit('item', item);
    });
});
app.post('/doctors/chat', function (req, res) {

    console.log("creating chat");
    Msg.create({
        source: req.body.source,
        content: req.body.content,
        date: req.body.date,
        doctorId: req.body.doctorId,
        done: false
    }, function (err, review) {
        if (err)
            res.send(err);
        Msg.find(function (err, reviews) {
            if (err)
                res.send(err)
            res.json(reviews);
        });
    });
});
app.get('/doctors/chat', function (req, res) {

    console.log("fetching chat");
    Msg.find(function (err, reviews) {
        if (err)
            res.send(err)
        res.json(reviews);
    });
});
//---------------


server.listen(port, function (err) {
    console.log('listening on: ' + port);
});
