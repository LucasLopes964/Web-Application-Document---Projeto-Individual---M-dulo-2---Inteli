const pool = require('../config/database'); // Importa a conexão com o banco

// Mostrar a página de login
exports.mostrarLogin = (req, res) => {
  res.render('login'); 
};

// Criar novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const query = `INSERT INTO "Usuario" (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`;
  const values = [nome, email, senha];

  try {
    await pool.query(query, values);
    res.redirect('/usuarios'); 
  } catch (err) {
    res.status(500).send('Erro ao criar usuário: ' + err.message);
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Usuario" ORDER BY id');
    res.render('usuarios', { usuarios: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao listar usuários: ' + err.message);
  }
};

exports.buscarUsuario = async (req, res) => {
  res.status(501).send('Não implementado');
};

exports.editarUsuario = async (req, res) => {
  
  res.status(501).send('Não implementado');
};

exports.excluirUsuario = async (req, res) => {

  res.status(501).send('Não implementado');
};
