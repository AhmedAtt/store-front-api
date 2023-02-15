import express from 'express';
import usersRoute from "./users.route";
import productsRoute from "./products.route";
import ordersRoute from "./orders.route";

const router = express.Router();

router.use(usersRoute);
router.use(productsRoute);
router.use(ordersRoute);

export default router;