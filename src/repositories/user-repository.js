import config from '../configs/db_config.js';
import pkg from 'pg';
const {Client,Pool} = pkg;

 class UserRepository{
    async getUserByName(username) {
        const client = new Client(config);
        try {
    
          const sql = 'SELECT * FROM users WHERE username = $1';
          const values = [username];
          await client.connect();
    
          const result = await client.query(sql, values);
    
          await client.end();
    
          if (result.rows.length === 0) {
            return null;
          }
    
          return result.rows[0];
        } catch (error) {
          console.error('Error en getUserByName:', error);
          await client.end();
          return null;
        }
      }
}

export default EventRepository
