var koa = require('koa');
var parse = require('co-body');
var app = koa();

app.use(function* (next){

  if(this.method === 'POST'){
    var body = yield parse(this);
    var reqName = body.name;

    this.body = reqName.toUpperCase();

  }else{
    return yield next;
  }

})

app.listen(process.argv[2]);