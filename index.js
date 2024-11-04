var express = require('express');
var app = express();
app.use(express.json());

app.use(express.static('./pages'));

//importante o modulo de mysql
var mysql = require('mysql');

//criando a variável con que vai ter a referência de conexão
//com o banco de dados
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "streamx2"
});

//tentando connectar
//a variável con tem a conexão agora
con.connect(function (err) {
    //if (err) throw err;
    console.log("Connected!");
});

const router = express.Router();

//endpoint para o login
router.post('/api/login', (req, res) => {
    var login = req.body;
    var sql = `select id, email from cliente where email = '${cliente.email}' and
    senha = '${cliente.senha}' and status = 1 `;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
});

//endpoint para se registrar
router.post('/api/cadastro', (req, res) => {
    var cliente = req.body;
    var sql = `insert into cliente (nome, email, anoNasc, cep, cpf) values ('${cliente.name}','${cliente.email}',
    '${cliente.birthYear}')'${cliente.cep}''${cliente.cpf}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
});

//endpoint para salvar um cliente
router.post('/api/cliente', (req, res) => {
    var cliente = req.body;
    var sql = '';
    if (cliente.id) {
        sql = `UPDATE cliente SET email = '${cliente.email}', 
        senha = '${cliente.senha}', status = '${cliente.status ? 1 : 0}' 
        WHERE id = ${ciente.id}`; 
    } else {
        sql = `INSERT INTO cliente (email, senha) VALUES 
    ('${cliente.email}', '${cliente.senha}','${cliente.status ? 1 : 0}')`;
    }
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    res.status(201).json(usuario);
});

//endpoint para capturar um usuário por id
router.get('/api/cliente/:id', (req, res) => {
    const id = req.param("id");

    let sql = `SELECT c.id, c.email, c.nome FROM cliente c WHERE c.id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
});

//endpoint para excluir um usuário
router.delete('/api/cliente/:id', (req, res) => {
    const id = req.param("id");

    var sql = `DELETE FROM cliente WHERE id = ${id} `;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    res.status(200).send(`usuário com id ${id} excluído`);
});

router.post('/api/filmes', (req, res) => {
    var filme = req.body;
    var sql = `insert into Filme (Titulo) values (${filme.movieName})`;
    var sql = `insert into Aluguel_aluga (valor) values (${valor.rentalPrice})`;
    var sql = `insert into Filme (Ano) values (${ano.premierYear})`;
    var sql = `insert into Genero (Nome) values (${genero.genre})`;
    var sql = `insert into Genero (Nome) values (${genero2.genre2})`;
    var sql = `insert into Classificacao_Indicativa (descricao) values (${classificacao_indicativa.age-classification})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    res.status(201).json(filme);
});

app.use(router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
