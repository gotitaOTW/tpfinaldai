import { Router } from "express";
import EventService from "../services/event-service.js";
const router=Router();
const svc = new EventService();

//2 y 3
router.get('/', async(req,res)=>{
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

        returnArray=await svc.getSomeAsync(filtros);
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
    return respuesta;
})

//6
router.post('/', async (req,res)=>{
    const {
        name,
        description,
        id_event_location,
        start_date,
        duration_in_minutes,
        price,
        enabled_for_enrollment,
        max_assistance,
      } = req.body;
    
      if (!name || name.trim().length < 3) {
        return res.status(400).json({ error: "El nombre debe tener al menos 3 letras." });
      }
      
      if (!description || description.trim().length < 3) {
        return res.status(400).json({ error: "La descripción debe tener al menos 3 letras." });
      }
      
      if (duration_in_minutes < 0) {
        return res.status(400).json({ error: "La duración no puede ser negativa." });
      }
      
      if (price < 0) {
        return res.status(400).json({ error: "El precio no puede ser negativo." });
      }

      const authHeader = req.get('Authorization');//saca el header
        if (!authHeader) {
        return res.status(401).json({ error: 'Token no enviado' });//si no existe retorna 401
        }
        const token = authHeader.split(' ')[1];//saca el token del header

        try {
          const resultado = await svc.postEvent(token, {
            name,
            description,
            id_event_location,
            start_date,
            duration_in_minutes,
            price,
            enabled_for_enrollment,
            max_assistance
          });
        
          res.status(201).json(resultado);
        } catch (error) {
          res.status(error.statusCode || 500).json({ error: error.message });
        }

})


//post: inserta un evento
// 
// controller recibe token y los datos a ingresa
// valida que existan y manda al svc, caso que no sean validos retorna bad request (400) y un mensajito bonito
//svc desencripte token y valida el usuario, caso contrario retorna 401 Unauthorized
//pide el repository que inserte los datos con el id usuario 
//retorna 201

//put: actualizar evento
//recibe token, id evento a actualizar y valor/es nuevo/s
//valida q sea numero, caso contrario bad request
//svc desencripta token y trae el evento
//valida el usuario, evento y que el usuario sea el creador del evento, caso contrario UNauthorized o not found el event
//pide al repository q actualice datos



export default router;


