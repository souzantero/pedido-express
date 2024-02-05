export interface HttpController<T> {
  handle(request: HttpRequest): Promise<HttpResponse<T>>;
}

export interface HttpRequest {
  body: any;
  params: any;
  query: any;
}

export class HttpResponse<T> {
  private constructor(
    public readonly status: HttpStatus,
    public readonly body?: T | HttpError,
  ) {}

  static ok<T>(body?: T) {
    return new HttpResponse<T>(HttpStatus.Ok, body);
  }

  static created<T>(body?: T) {
    return new HttpResponse<T>(HttpStatus.Created, body);
  }

  static noContent<T>() {
    return new HttpResponse<T>(HttpStatus.NoContent);
  }

  static error<T>(error: HttpError) {
    return new HttpResponse<T>(error.status, error);
  }
}

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServer = 500,
}

export class HttpError extends Error {
  constructor(public readonly status: HttpStatus, message: string) {
    super(message);
  }
}

export class InternalServerError extends HttpError {
  constructor(error?: unknown) {
    super(HttpStatus.InternalServer, 'Internal server error');
    if (error instanceof Error) {
      this.stack = error.stack;
    }
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.BadRequest, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.NotFound, message);
  }
}
