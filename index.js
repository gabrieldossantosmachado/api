const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '99715661',
    database : 'laravel'
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8082, function () {
  console.log('%s listening at %s', server.name, server.url);
});

//retorna todos os registros da  tabela  manutencoes
server.get('/api/auth/manutencoes', (req, res, next) => {
    
    knex('manutencao' ).then((dados) => {
        res.send(dados);
    }, next)
    
});

//retorna todos os registros da  tabela  prioridades
server.get('/api/auth/prioridades', (req, res, next) => {
    
    knex('prioridade' ).then((dados) => {
        res.send(dados);
    }, next)
    
});

//retorna todos os registros da  tabela departamentos
server.get('/api/auth/departamentos', (req, res, next) => {
    
    knex('departamentos').then((dados) => {
        res.send(dados);
    }, next)
    
});

//insert
server.post('/api/auth/cadastrarmanutencao', (req, res, next) => {
    knex('manutencao')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
    
});

server.post('/api/auth/login/:email/:password', (req, res, next) => {
    
    const { email } = req.params;
    const { password } = req.params;

    knex('users')
        .where('email', email)
        .where('password', password)


        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('0'))
            res.send(dados);
        }, next)
});