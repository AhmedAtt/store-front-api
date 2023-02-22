import express from "express";

import {
    getUserActiveOrder,
    getUserCompletedOrders
} from "../handlers/orders.handler";
import {authorize} from "../middleware/auth";

const router = express.Router();

router.get('/orders/:id',authorize,getUserActiveOrder );
router.get('/orders/completed/:id',authorize, getUserCompletedOrders);

export default router;
