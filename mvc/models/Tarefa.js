const db = require('../config/db');

class Tarefa {
  static async getAll() {
    const result = await db.query('SELECT * FROM tarefa');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tarefa WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO tarefa 
        (titulo, descricao, data_entrega, prioridade, status, usuario_id, disciplina_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        data.titulo,
        data.descricao,
        data.data_entrega,
        data.prioridade,
        data.status,
        data.usuario_id,
        data.disciplina_id
      ]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      `UPDATE tarefa SET 
        titulo = $1, descricao = $2, data_entrega = $3, 
        prioridade = $4, status = $5, usuario_id = $6, disciplina_id = $7 
       WHERE id = $8 RETURNING *`,
      [
        data.titulo,
        data.descricao,
        data.data_entrega,
        data.prioridade,
        data.status,
        data.usuario_id,
        data.disciplina_id,
        id
      ]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tarefa WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Tarefa;
