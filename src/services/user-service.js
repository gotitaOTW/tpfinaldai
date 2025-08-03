import UserRepository from "../repositories/user-repository.js";
import jwt from 'jsonwebtoken';


 class UserService{
    async loginAsync(user, password) {
        let token = null;
        const repo = new UserRepository();
        const usuario = await repo.getUserByName(user);//hacer esto

        if (usuario && usuario.password === password) {
            token = this.crearToken(usuario);
        }
        
        return token;
    }
    

     crearToken(user) {
      const payload = { id: user.id, role: user.username };
      const token = jwt.sign(payload, process.env.claveSecretaJWT, { expiresIn: '2h' });
      return token;
    }
    
}

export default UserSevice;