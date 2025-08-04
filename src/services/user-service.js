import UserRepository from "../repositories/user-repository.js";
import jwt from 'jsonwebtoken';


 class UserService{
    async loginAsync(user, password) {
        let token = null;
        const repo = new UserRepository();
        const usuario = await repo.getUserByName(user);

        if (usuario && usuario.password === password) {
            token = this.crearToken(usuario);
        }
        
        return token;
    }

    async registerAsync(first_name, last_name, username, password){
        const repo = new UserRepository();
        if(!(await repo.getUserByName(username))){
            try {
            return await repo.registerUser(first_name, last_name, username, password);
            } catch (error) {
                throw new Error("No se pudo registrar el usuario: "+error.message);
            }
        }
        else{
            throw new Error("El usuario ya existe");
        }
    }
    

     crearToken(user) {
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.claveSecretaJWT, { expiresIn: '2h' });
      return token;
    }

    verificarToken(token){
        if (!token) return null;
        try {
            const payload = jwt.verify(token, process.env.claveSecretaJWT);
            return { id: payload.id, username: payload.username };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
}

export default UserSevice;