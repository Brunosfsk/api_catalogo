import express, { Router } from 'express'
import { WhatsController } from './controller/WhatsController.js';
import { AuthController } from './controller/AuthController.js';

export const router = Router();

const whatscontroller = new WhatsController
const authcontroller = new AuthController


router.use(express.json());

router.post("/auth", authcontroller.authenticate)

router.post("/pedido", whatscontroller.whatsMessage)

router.get("/teste", whatscontroller.whatsTeste)


router.get("/", (req, res) => {
  res.send("ola mundo");
})