import express from "express";

import {
    getOrderByUserId,
    getUserCompletedOrders
} from "../handlers/orders.handler";
import {authorize} from "../middleware/auth";

const router = express.Router();

router.get('/orders/:id',authorize, getOrderByUserId);
router.get('/orders/completed/:id',authorize, getUserCompletedOrders);

export default router;
