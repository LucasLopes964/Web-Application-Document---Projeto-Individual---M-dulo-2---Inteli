const db = require('../config/db');

class Disciplina {
  static async getAll() {
    const result = await db.query('SELECT * FROM disciplina');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM disciplina WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO disciplina (nome, usuario_id) VALUES ($1, $2) RETURNING *',
      [data.nome, data.usuario_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE disciplina SET nome = $1, usuario_id = $2 WHERE id = $3 RETURNING *',
      [data.nome, data.usuario_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM disciplina WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Disciplina;
