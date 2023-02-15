import { Request, Response } from 'express';
import { Order, OrdersModel } from '../models/order';

const model = new OrdersModel();
// get order by user id
export const getOrderByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: Order = await model.show(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get user completed orders
export const getUserCompletedOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders: Order[] = await model.showCompleted(req.params.id);
        res.json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
}