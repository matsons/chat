var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html', function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Severd up: /index.html');
        }
    });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
      console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
      console.log('message: ', msg);
      io.emit('chat message', msg);
  });
});

server.listen(app.get('port'), function(){
  console.log('listening on '+app.get('port'));
});
