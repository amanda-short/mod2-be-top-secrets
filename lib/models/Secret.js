const pool = require('../utils/pool');

class Secret {
  constructor({ id, title, description, timestamp, }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = timestamp; 
  }

  static async getAllSecrets() {
    const { rows } = await pool.query('SELECT * FROM secrets');

    return rows.map((row) => new Secret(row));  
  }
}

module.exports = Secret;
