var koa = require('koa');
var app = koa();

app.keys = ['secret', 'keys'];

app.use(function* (next){

  var opt = {
    "signed": true
  };

  var view = this.cookies.get('view', opt);
  view = view ? ++view : 1;

  this.cookies.set('view', view, opt);
  this.body = view+' views';

});

app.listen(process.argv[2]);