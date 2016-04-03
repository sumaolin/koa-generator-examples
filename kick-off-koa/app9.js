var koa = require('koa');
var session = require('koa-session');
var app = koa();

app.keys = ['secret', 'keys'];
app.use(session(app));

app.use(function* (next){

  var n = this.session.view || 0;
  this.session.view = ++n;

  this.body = n+' views';

})

app.listen(process.argv[2]);