import config from 'src/configs/db_config.js';
import pkg from 'pg'
const {Client,Pool} = pkg;

export default class ProvinceRepository{
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
    getSomeAsync = async ( name = null, startdate = null, fecha = null ) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces `;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } 
        catch (error) {
            console.log(error);
        }
        return returnArray;
    };
      
}
