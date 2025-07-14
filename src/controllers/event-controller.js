import { Router } from "express";
import EventService from "../services/event-service";
const router=Router();
const svc = new EventService();

//2 y 3
router.get('', async(req,res)=>{
    let respuesta;
    let returnArray;
    const name=req.query.name;
    const startdate=req.query.startdate;
    const texto=req.query.texto;

    if(name||startdate||texto){//con filtros
        const filtros={};
        if(name){filtros.name=name;}
        if(startdate){filtros.startdate=startdate;}
        if(texto){filtros.texto=texto;}

        returnArray=await svc.getSomeAync(filtros);
    }
    else{//sin filtros
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

//4
router.get('/:id', async(req,res)=>{
    let respuesta;
     const {id}=req.params;

    if (!id) {
        return res.status(400).json({ error: 'El ID es requerido' });
      }

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
      }
    
    try {
        const evento=await svc.getByIdAsync(Number(id));
        if(evento){
            respuesta=res.status(200).json(evento);
        }
        else{
            respuesta=res.status(404).json({error:'Event not found'});
        }
    } catch (error) {
    console.log(error);
    respuesta=res.status(500).json("Error interno");
    }
})



