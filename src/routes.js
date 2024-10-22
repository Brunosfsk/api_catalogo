import express, { Router } from 'express';
import { WhatsController } from './controller/public/WhatsController.js';
import { AuthController } from './controller/public/AuthController.js';
import { OrdersController } from './controller/public/OrdersController.js';
import { ProspectsController } from './controller/public/ProspectsController.js';
import { BusinessController } from './controller/public/BusinessController.js';
import { TelegramController } from './controller/TelegramController.js';

export const router = Router();

const whatscontroller = new WhatsController();
const authcontroller = new AuthController();
const orderscontroller = new OrdersController();
const prospectscontroller = new ProspectsController();
const businesscontroller = new BusinessController();
const telegramController = new TelegramController();

router.use(express.json());

// public routes
router.post('/auth', authcontroller.authenticate);

router.get('/orders', orderscontroller.getOrders);

router.post('/orders', orderscontroller.createOrder);

router.patch('/orders/:id', orderscontroller.updateOrder);

router.get('/orders/roles.category', orderscontroller.findRolesCategory);

router.get('/business', businesscontroller.findMany);

router.get('/business/:url', businesscontroller.findUnique);

router.get('/prospects', prospectscontroller.getProspects);

router.post('/pedido', whatscontroller.whatsMessage);

router.get('/teste', whatscontroller.whatsTeste);

router.post('/telegram', telegramController.sendMessageTelegram);

// private routes

router.get('/', (req, res) => {
  res.send('ola mundo');
});
