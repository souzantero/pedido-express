export class Provider {
  constructor(
    private readonly hostAddress: string
  ) { }

  get(path: string): Promise<any> {
    return fetch(`${this.hostAddress}${path}`)
      .then(this.handleResponse);
  }

  post(path: string, body: any): Promise<any> {
    return fetch(`${this.hostAddress}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(this.handleResponse);
  }

  put(path: string, body: any): Promise<any> {
    return fetch(`${this.hostAddress}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(this.handleResponse);
  }

  private async handleResponse(response: Response) {
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new ResponseWasNotJsonError();
    }

    const body = await response.json();

    if (!response.ok) {
      throw new ResponseError(body.message);
    }

    return body;
  }
}

export class ResponseError extends Error {
  constructor(
    public readonly message: string
  ) {
    super(message);
    this.name = 'ResponseError';
  }
}

export class ResponseWasNotJsonError extends Error {
  constructor() {
    super('Response was not JSON');
    this.name = 'ResponseWasNotJsonError';
  }
}
