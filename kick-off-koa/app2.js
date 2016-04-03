var koa = require('koa');
var app = koa();

app.use(function* (next){
  var path = this.path;

  if(path === '/'){
    this.body = 'hello koa';
  }else if(path === '/404'){
    this.body = 'page not found';
  }else if(path === '/500'){
    this.body = 'internal server error';
  }else{
    return yield next;
  }
})


app.listen(process.argv[2] || 3000);