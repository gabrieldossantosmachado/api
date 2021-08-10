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

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});


//retorna todos os registros da  tabela 
server.get('/manutencoes', (req, res, next) => {
    
    knex('manutencao').then((dados) => {
        res.send(dados);
    }, next)
    
});

//insert
server.post('/cadastro-de-manutencao', (req, res, next) => {
    
    knex('manutencao')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
    
});


//seleciona um registro por vez
server.get('/manutencao/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('manutencao')
        .where('id', id)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)
        
});


//update em um único registor
server.put('/update/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('departamentos')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados atualizados');
        }, next)
        
});

//delete em um úncio registro
server.del('/delete/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('departamentos')
        .where('id', id)
        .delete()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)
        
});