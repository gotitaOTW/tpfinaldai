import { Router } from "express";
import UserService from "../services/user-service.js";
const router = Router();
const svc = new UserService();

//5
router.post('/login', async(req,res)=>{
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

router.post('register', async (req,res)=>{
  let msjError;
  const {first_name, last_name, username, password}=req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!first_name || first_name.length < 3 || !last_name || last_name.length < 3) {msjError="Nombre o apellido tienen menos de 3 letras";}
  else if (!password || password.length < 3) {msjError="La contraseña debe tener al menos 3 letras";}
  else if (!emailRegex.test(username)) {msjError="El email no es válido";}

  if(msjError!=null){
    return res.status(400).json(msjError);
  }

  try {
    await svc.registerAsync(first_name, last_name, username, password);
    return res.status(201).json("Usuario registrado con éxito");
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

})

//6

//7

//8

export default router;

//recibe los datos por body, retorna 400 si faltan o no cumplen con 3 letras min etc
//se los pasa al service que valida q no exista, caso contrario retorna 409
//lo mete y devuelve 201
