import config from '../configs/db_config.js';
import pkg from 'pg'
const {Client,Pool} = pkg;

 class EventRepository{
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
            const sql = `
                        SELECT
                        e.id,
                        e.name,
                        e.description,
                        e.start_date,
                        e.duration_in_minutes,
                        e.price,
                        e.enabled_for_enrollment,
                        e.max_assistance,
                    
                        u.id AS idCreador,
                        u.first_name AS nombreCreador,
                        u.last_name AS apellidoCreador,
                        u.username AS nombreDeUsuarioCreador,
                    
                        el.id AS idLugar,
                        el.name AS nombreLugar,
                        el.full_address,
                        el.max_capacity,
                        el.latitude AS latitudLugar,
                        el.longitude AS longitudLugar,
                    
                        l.id AS idLocalidad,
                        l.name AS nombreLocalidad,
                        l.latitude AS latitudLocalidad,
                        l.longitude AS longitudLocalidad,
                    
                        p.id AS idProvincia,
                        p.name AS nombreProvincia,
                        p.full_name AS nombreCompletoProvincia,
                        p.latitude AS latitudProvincia,
                        p.longitude AS longitudProvincia
                    
                    FROM events e
                    JOIN users u ON u.id = e.id_creator_user
                    JOIN event_locations el ON el.id = e.id_event_location
                    JOIN locations l ON l.id = el.id_location
                    JOIN provinces p ON p.id = l.id_province
                    WHERE e.id = $1`;

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

export default EventRepository
