import express from "express";
import cors from "cors";
import EventRouter from './controllers/event-controller.js'

const app = express();
const port=3000;

app.use(cors());
app.use(express.json());

app.use('/api/event', EventRouter);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})


//arreglar node.js, las peticiones tienen algunas fallas, no funcionan en postman, no las puedo usar en el tp de efsi