import EventRepository from "../repositories/event-repository.js";


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
    
}

export default EventService;