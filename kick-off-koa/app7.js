var koa  = require('koa');
var app = koa();

app.use(errorHandler());
app.use(function* (next){
  if(this.path === '/error') throw new Error('ooops');
  this.body = 'OK';
});

function errorHandler(){
  return function* (next){
    try{
      yield next;
      console.log('try');
    }catch(e){
      console.log('catch');
      this.status = 500;
      this.body = 'internal server error';
    }

  }
}

app.listen(process.argv[2]);