import {Request, Response} from 'express';
import {OrdersModel, OrderWithItems} from '../models/order';

const model = new OrdersModel();
// get order by user id
export const getUserActiveOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: OrderWithItems = await model.showActiveOrder(parseInt(req.params.id));
        res.json({order});
    } catch (err) {
        res.status(500).json(err);
    }
}

// get user completed orders
export const getUserCompletedOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders: OrderWithItems[] = await model.showCompletedOrders(parseInt(req.params.id));
        res.json({orders});
    } catch (err) {
        res.status(500).json(err);
    }
}