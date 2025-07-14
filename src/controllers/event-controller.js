import { Router } from "express";
import EventService from "../services/event-service";
const router=Router();
const svc = new EventService();

router.get('', async(req,res)=>{
    let respuesta;
    let returnArray;
    const name=req.query.name;
    const startdate=req.query.startdate;
    const texto=req.query.texto;

    if(name||startdate||texto){
        
    }
    else{
        returnArray=await svc.getAllAsync();
    }

    if(returnArray!=null){
        respuesta=res.status(200).json(returnArray);
    }
    else{
        respuesta=res.status(500).json("Error interno");
    }
    return respuesta;
});


