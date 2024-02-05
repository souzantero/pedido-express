import {
  HttpController,
  HttpRequest,
  HttpResponse,
  HttpStatus,
} from '../controllers/http-controller';

export class LogHttpControllerDecorator<T> implements HttpController<T> {
  constructor(private readonly httpController: HttpController<T>) {}

  async handle(request: HttpRequest): Promise<HttpResponse<T>> {
    const httpResponse = await this.httpController.handle(request);
    if (httpResponse.status === HttpStatus.InternalServer) {
      console.error(httpResponse.body);
    }

    return httpResponse;
  }
}
