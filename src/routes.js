import express, { Router } from 'express'
import { WhatsController } from './controller/public/WhatsController.js';
import { AuthController } from './controller/public/AuthController.js';
import { OrdersController } from './controller/public/OrdersController.js';
import { ProspectsController } from './controller/public/ProspectsController.js';

export const router = Router();

const whatscontroller = new WhatsController
const authcontroller = new AuthController
const orderscontroller = new OrdersController
const prospectscontroller = new ProspectsController


router.use(express.json());

// public routes
router.post("/auth", authcontroller.authenticate)

router.get("/orders", orderscontroller.getOrders);

router.post("/orders", orderscontroller.createOrder);

router.patch("/orders/:id", orderscontroller.updateOrder);


router.get("/prospects", prospectscontroller.getProspects)

router.post("/pedido", whatscontroller.whatsMessage)

router.get("/teste", whatscontroller.whatsTeste)

// private routes


router.get("/", (req, res) => {
  res.send("ola mundo");
})