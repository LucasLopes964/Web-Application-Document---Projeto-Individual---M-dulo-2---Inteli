const pool = require('../config/database');

// Listar todas as disciplinas e renderizar a view
exports.listarDisciplinas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM disciplina');
    res.render('disciplinas', { disciplinas: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao listar disciplinas: ' + err.message);
  }
};

// Mostrar formulário para criar nova disciplina
exports.mostrarFormularioCriar = (req, res) => {
  res.render('disciplina_form', { disciplina: null });
};

// Criar nova disciplina (POST)
exports.criarDisciplina = async (req, res) => {
  const { nome, usuario_id } = req.body;
  const query = `INSERT INTO disciplina (nome, usuario_id) VALUES ($1, $2) RETURNING *`;
  const values = [nome, usuario_id];

  try {
    await pool.query(query, values);
    res.redirect('/disciplinas');
  } catch (err) {
    res.status(500).send('Erro ao criar disciplina: ' + err.message);
  }
};

// Mostrar formulário para editar disciplina
exports.mostrarFormularioEditar = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM disciplina WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Disciplina não encontrada');
    }
    res.render('disciplina_form', { disciplina: result.rows[0] });
  } catch (err) {
    res.status(500).send('Erro ao carregar disciplina: ' + err.message);
  }
};

// Editar disciplina (POST)
exports.editarDisciplina = async (req, res) => {
  const { id } = req.params;
  const { nome, usuario_id } = req.body;

  const query = `UPDATE disciplina SET nome = $1, usuario_id = $2 WHERE id = $3 RETURNING *`;
  const values = [nome, usuario_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send('Disciplina não encontrada');
    }
    res.redirect('/disciplinas');
  } catch (err) {
    res.status(500).send('Erro ao editar disciplina: ' + err.message);
  }
};

// Excluir disciplina (POST)
exports.excluirDisciplina = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM disciplina WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Disciplina não encontrada');
    }
    res.redirect('/disciplinas');
  } catch (err) {
    res.status(500).send('Erro ao excluir disciplina: ' + err.message);
  }
};
