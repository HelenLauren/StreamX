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
    var usuario = req.body;
    var sql = `select id, email from usuario where email = '${usuario.email}' and
    senha = '${usuario.senha}' and status = 1 `;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
});

//endpoint para se registrar
router.post('/api/registrese', (req, res) => {
    var usuario = req.body;
    var sql = `insert into usuario (email,codigo,status) values ('${usuario.email}',
    '3543',0) `;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });

    //enviar o código por email
});

//endpoint para listar todos os usuários
router.get('/api/usuarios', (req, res) => {
    //cria a string the consulta no baco do tipo select
    let sql = "SELECT u.id, u.email, u.status FROM usuario u";
    //executando o comando sql com a função query
    //nela passamos a string de consulta
    //após a execução ele retorna o function que vai ter a variável err e result
    //se deu algum erro a variável err terá o erro obtivo
    //caso contrário o result terá dos dados do banco 
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
});

//endpoint para salvar um usuário
router.post('/api/usuarios', (req, res) => {
    var usuario = req.body;
    var sql = '';
    if (usuario.id) {
        sql = `UPDATE usuario SET email = '${usuario.email}', 
        senha = '${usuario.senha}', status = '${usuario.status ? 1 : 0}' 
        WHERE id = ${usuario.id}`; 
    } else {
        sql = `INSERT INTO usuario (email, senha, status) VALUES 
    ('${usuario.email}', '${usuario.senha}','${usuario.status ? 1 : 0}')`;
    }
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    res.status(201).json(usuario);
});

//endpoint para capturar um usuário por id
router.get('/api/usuarios/:id', (req, res) => {
    const id = req.param("id");

    let sql = `SELECT u.id, u.email, u.status FROM usuario u WHERE u.id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
});

//endpoint para excluir um usuário
router.delete('/api/usuarios/:id', (req, res) => {
    const id = req.param("id");

    var sql = `DELETE FROM usuario WHERE id = ${id} `;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    res.status(200).send(`usuario com id ${id} excluído`);
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