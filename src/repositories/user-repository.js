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
          console.error('Error al buscar usuario:', error);
          return null;
        }
      }

      async registerUser(first_name, last_name, username, password){
        const client = new Client(config);
        try{
          const sql=`INSERT INTO users (first_name, last_name, username, password)
          VALUES ($1, $2, $3, $4)
          RETURNING *
          `;
          const values=[first_name, last_name, username, password];
          await client.connect();
          const result = await client.query(sql, values);
          await client.end();

          if (result.rows.length === 0) {
            return null;
          }
          return result.rows[0];
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          return null;
        }
      }
}

export default EventRepository
