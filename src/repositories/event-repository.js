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
                    
                        json_build_object(
                            'id', u.id,
                            'first_name', u.first_name,
                            'last_name', u.last_name,
                            'username', u.username
                        ) AS creator,
                    
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
                    INNER JOIN users u ON u.id = e.id_creator_user
                    INNER JOIN event_locations el ON el.id = e.id_event_location
                    INNER JOIN locations l ON l.id = el.id_location
                    INNER JOIN provinces p ON p.id = l.id_province
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


    postEventAsync = async (idCreador, data) => {
        const client = new Client(config);
        try {
            const sql = `
                INSERT INTO events (
                    name,
                    description,
                    id_event_location,
                    start_date,
                    duration_in_minutes,
                    price,
                    enabled_for_enrollment,
                    max_assistance,
                    id_creator_user
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
            `;
            const values = [
                data.name,
                data.description,
                data.id_event_location,
                data.start_date,
                data.duration_in_minutes,
                data.price,
                data.enabled_for_enrollment,
                data.max_assistance,
                idCreador
            ];

            await client.connect();
            await client.query(sql, values);
            await client.end();

            return 'Evento creado exitosamente.';
        } catch (error) {
            throw error
        }
    };

    hasEventRegistrations = async (eventId) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT COUNT(*) FROM event_registrations WHERE id_event = $1`;
            const result = await client.query(sql, [eventId]);
            await client.end();
            
            // Retorna true si hay al menos una inscripción
            return parseInt(result.rows[0].count) > 0;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    deleteEventAsync = async (eventId) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE FROM events WHERE id = $1`;
            const result = await client.query(sql, [eventId]);
            await client.end();
            
            if (result.rowCount === 0) {
                throw new Error('Evento no encontrado');
            }
            
            return 'Evento eliminado exitosamente';
        } catch (error) {
            throw error;
        }
    };

      
}

export default EventRepository
