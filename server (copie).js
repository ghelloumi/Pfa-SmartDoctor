var logger = require('morgan'),
  cors = require('cors'),
  http = require('http'),
  express = require('express'),
  errorhandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  helmet = require('helmet'),
  config = require('./config.json'),
  app = express(),

socket = require('socket.io');
 

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}
var port = process.env.PORT || 3001;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.use(require('./doctor-routes')); //doctor-routes



var server = http.createServer(app),
    socket = socket.listen(server);


socket.on('connection', function(connection) {
    console.log('User Connected');
    connection.on('message', function(msg){
        socket.emit('message', msg);
    });
});

 
server.listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
