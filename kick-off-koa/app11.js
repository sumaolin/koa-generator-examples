var koa = require('koa');
var session = require('koa-session');
var views = require('co-views');
var parse = require('co-body');
var app = koa();

app.keys = ['secret1', 'secret2', 'secret3'];
app.use(session(app));

var render = views(__dirname+'/views', {
  ext: 'ejs'
});

app.use(function* home(next){

  if(this.path !== '/') return yield next;
  var login = this.session.authenticated;
  if(login){
    this.body = 'hello world';
  }else{
    this.status = 401;
  }

});

app.use(function* login(next){
  if(this.path !== '/login') return yield next;

  if(this.method === 'POST'){
    var body = yield parse(this); // * 前面要加yield

    if(body.username === 'username' || body.password === "password"){
      this.session.authenticated = true;
      this.redirect('/');
    }else{
      return this.status = 400;
    }

  }else if(this.method === 'GET'){
    this.body = yield render('form', null);
  }else{
    this.redirect("/");
    return yield next;
  }
})

app.use(function* logout(next){
  if(this.path !== '/logout') return yield next;
  this.session.authenticated = false;
  this.redirect('/login');
})

app.listen(process.argv[2]);

