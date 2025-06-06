const pool = require('../config/database');

// 🔽 Nova versão: Listar tarefas e renderizar view
exports.listarTarefas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefa ORDER BY data_entrega');
    const tarefas = result.rows;
    res.render('tarefas', { tarefas }); // renderiza a view EJS com os dados
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).send('Erro ao carregar tarefas: ' + err.message);
  }
};

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { titulo, descricao, data_entrega, prioridade, status, usuario_id, disciplina_id } = req.body;

  const query = `
    INSERT INTO tarefa (titulo, descricao, data_entrega, prioridade, status, usuario_id, disciplina_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [titulo, descricao, data_entrega, prioridade, status, usuario_id, disciplina_id];

  try {
    await pool.query(query, values);
    res.redirect('/tarefas'); // Redireciona para a lista após criar
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).send('Erro ao criar tarefa: ' + err.message);
  }
};

// Buscar uma tarefa por ID (JSON)
exports.buscarTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM tarefa WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data_entrega, prioridade, status, usuario_id, disciplina_id } = req.body;

  const query = `
    UPDATE tarefa SET 
      titulo = $1, descricao = $2, data_entrega = $3, prioridade = $4, status = $5, usuario_id = $6, disciplina_id = $7
    WHERE id = $8
    RETURNING *`;
  const values = [titulo, descricao, data_entrega, prioridade, status, usuario_id, disciplina_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao editar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tarefa WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};
