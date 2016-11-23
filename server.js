
var express    = require('express');
var app        = express();      

var http = require('http').Server(app);
var fs = require("fs");
var router = express.Router();   
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var io = require('socket.io')(http);

var prateleiras = [
  {"id":1,"status":null},
  {"id":2,"status":null}
];

app.post('/api/prateleira', function(request, response){
    if(request.body.id && request.body.status){
      
      for (var i in prateleiras) {
        value = prateleiras[i];
        if(value.id==request.body.id){
          value.status=request.body.status;
        }
      }
      console.log(prateleiras);
      io.emit('atualiza_ae', prateleiras);

      response.json({ message: "Status da prateleira #"+request.body.id+" alterado."});
    }else{
      response.json({"error":true, "message": "Parâmetros incorretos."});
    }

});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/css/style.css', function(req, res){
  res.sendfile('css/style.css');
});
 
// Quando tivermos uma chamada para o nosso socket iremos logar no terminal uma mensagem de novo usuário
io.on('connection', function(socket){
  io.emit('atualiza_ae', prateleiras);
});
 
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

http.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

function server_talk(servidor, msg){
  return getDateTime() + ' {'+servidor+'} ' + msg;
}
