var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

//Conexion de un usuario al servidor
//socket == user
//io == server
io.on('connection', function(socket){
	var usuario = "";
	console.log("user connected");

	socket.on('disconnect', function(){
		console.log("User disconnected");
		io.emit('desconectado',usuario);
	});
	//chat message es el nombre del evento que se asigna en el emit del html
	socket.on('chat message', function(msg){
		io.emit('chat message', msg, usuario);
	});

	socket.on('nombre usuario', function(usr){
		usuario = usr;
		socket.emit('mostrar alerta', usr);
	});

	socket.on('user typing', function(){
		io.emit('user typing', usuario);
	});

});

http.listen('3000', function(){
	console.log('listening on *:3000');
});