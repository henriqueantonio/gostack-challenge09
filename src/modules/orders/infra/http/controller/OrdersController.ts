import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

interface IProductsDTO {
  id: string;
  quantity: number;
}

interface IRequestDTO {
  customer_id: string;
  products: IProductsDTO[];
}

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrder = container.resolve(FindOrderService);

    const findedOrder = await findOrder.execute({ id });

    return response.json(findedOrder);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products }: IRequestDTO = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const createdOrder = await createOrder.execute({ customer_id, products });

    return response.json(createdOrder);
  }
}
