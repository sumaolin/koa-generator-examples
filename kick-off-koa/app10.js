var koa = require('koa');
var view = require('co-views');
var app = koa();
var render = view(__dirname+'/views', {
  ext: 'ejs'
});

app.use(function* (next){

  var user = {
    "name": {
      "first": "Tobi"
    },
    "age": 3,
    "species": "ferret"
  };

  this.body = yield render('user', {"user": user});

});

app.listen(process.argv[2]);