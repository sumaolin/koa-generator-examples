var koa = require('koa');
var app = koa();

var port = process.argv[2] || 3000;

app.use(function* (){
  this.body = 'hello koa';
});

app.listen(port);