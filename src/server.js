import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { router } from "./routes.js";

const app = express();

app.use(cors())
app.use(router)

const port = 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} \n http://localhost:${port}`);
})