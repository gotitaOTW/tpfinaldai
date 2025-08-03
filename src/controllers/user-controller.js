import { Router } from "express";
import UserService from "../services/user-service.js";
const router=Router();
const svc = new UserService();

//5
router.get('/api/user/login', async(req,res)=>{
    let respuesta;
    let returnArray;
    const {user, password}= req.body;


  if (!user || !password) {//validacion de datos, si algo no existe se devuelve 400
    return res.status(400).json({ error: 'Faltan datos' });
  }
  try {//se intenta traer el token, 200 si todo ok
    const token = await svc.loginAsync(user, password);
    return res.status(200).json({ token });
  } catch (error) {//si hay error, probablemente es porque no habia usuario y devuelve 401 con el error.
    return res.status(401).json({ error: error.message });
  }
});

//6

//7

//8

export default router;


