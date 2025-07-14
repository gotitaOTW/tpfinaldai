import config from 'src/configs/db_config.js';
import pkg from 'pg'
const {Client,Pool} = pkg;

export default class EventRepository{
    getAllAsync = async() =>
    {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } 
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getSomeAsync = async (filtros) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql = `SELECT * FROM provinces WHERE 1=1`;
            const values=[]
            let index=1;

            if(filtros.name){
                sql+=` AND name ilike $${index++}`;
                values.push(`%${filtros.name}%`);
            }
            if(filtros.startdate){
                sql+=` AND start_date = $${index++}`;
                values.push(filtros.startdate);
            }
            if(filtros.texto){
                sql+=` AND description ilike $${index++}`;
                values.push(`%${filtros.texto}%`);
            }
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } 
        catch (error) {
            console.log(error);
        }
        return returnArray;
    };

    getByIdAsync = async (id) =>{
        let returnArray=null;
        const client=new Client(config);
        try {
            await client.connect();
            const sql="SELECT * FROM events WHERE id=$1";
            values=[id];

            const result=await client.query(sql,values);
            await client.end();
            returnArray=result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
      
}
