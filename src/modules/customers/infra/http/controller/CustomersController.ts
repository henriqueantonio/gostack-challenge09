import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

interface IRequestDTO {
  name: string;
  email: string;
}

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email }: IRequestDTO = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }
}
