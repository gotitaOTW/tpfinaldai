import EventRepository from "../repositories/event-repository.js";
import UserRepository from "../repositories/user-repository.js";
import UserService from 'src/services/user-service.js'


 class EventService{
    getAllAsync=async()=>{
        const repo=new EventRepository();
        return await repo.getAllAsync();
    }

    getSomeAsync= async (filtros)=>{
        const repo=new EventRepository();
        return await repo.getSomeAsync(filtros);
    }
    getByIdAsync=async(id)=>{
        const repo =new EventRepository();
        return await repo.getByIdAsync(id);
    }
    
    postEvent=async (token, data)=>{
        const payload=UserService.verificarToken(token);
        if(!payload)throw new Error("Token inválido"); 
        const repoUser = new UserRepository();
        const repoEvent = new EventRepository();
        const user=await repoUser.getUserByName(payload.username);
        if(!user)throw new Error("Usuario inválido");
        const location= await repoEvent.getLocationById(data.id_event_location);//hacer
        if(data.max_assistance>location.max_capacity)throw new Error("Capacidad máxima inválida");

        try {
           await repoEvent.postEventAsync(user.id, data);
           return "Evento agregado con éxito";   
        } catch (error) {
            throw error;
        }
    }
}


export default EventService;