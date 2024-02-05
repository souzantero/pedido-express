import { Request, Response } from 'express';
import { HttpController } from '../../core/presentation/controllers/http-controller';

export const adaptRoute = <T>(httpController: HttpController<T>) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: { ...req.body },
      params: { ...req.params },
      query: { ...req.query },
    };

    const httpResponse = await httpController.handle(httpRequest);

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      return res.status(httpResponse.status).json(httpResponse.body);
    }

    const error = httpResponse.body as Error;
    return res.status(httpResponse.status).json({
      error: error?.message || 'Internal server error',
    });
  };
};
