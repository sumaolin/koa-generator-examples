var koa = require('koa');
var app = koa();

app.use(responseTime());
app.use(upperCase());

app.use(function* (next){
  this.body = 'hello koa'
});

function responseTime(){
  return function* (next){
    var cTime = new Date();

    yield next

    var oTime = new Date();
    this.set("X-Response-Time", oTime - cTime + 'ms');
  }
}

function upperCase(){
  return function* (next){
    yield next;
    this.body = this.body.toUpperCase();
  }
}

app.listen(process.argv[2]);